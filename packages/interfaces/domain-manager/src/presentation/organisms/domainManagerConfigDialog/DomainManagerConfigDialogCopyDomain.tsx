import { useState, useMemo } from 'react'
import { orderBy } from 'lodash'
import {
  Dialog,
  useToast,
  Badge,
  TextBody,
  ComboBox,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { Button } from '@falcon/buttons'
import { TeamTreeInput } from '@spacedock/starliner'
import { useTytoClient } from '@tyto/client'
import { useDomainUIConfigurationCreateMutation } from '@tyto/query'

import {
  useHomeConfigs,
  useTopMenuConfigs,
  useMasteryConfigs,
} from '../../../data/hooks/useEditableUIConfig'
import { useTeamsFiltered } from '../../../data/hooks'

export interface DomainManagerConfigDialogCopyDomainProps {
  domainID: number
  /** Config type: 'ocTRYYBTOPMENU' for menu configs, 'ocTRYYBSTART' for home configs, 'ocMASTERYSTART' for mastery configs */
  configType: 'ocTRYYBTOPMENU' | 'ocTRYYBSTART' | 'ocMASTERYSTART'
  onSuccess: () => void
  onCancel: () => void
}

/**
 * Generic component for copying configurations from another domain.
 * Works for menu configs (ocTRYYBTOPMENU), home configs (ocTRYYBSTART), and mastery configs (ocMASTERYSTART).
 */
export const DomainManagerConfigDialogCopyDomain = ({
  domainID,
  configType,
  onSuccess,
  onCancel,
}: DomainManagerConfigDialogCopyDomainProps) => {
  const toast = useToast()
  const tytoClient = useTytoClient()

  const [selectedSourceDomainID, setSelectedSourceDomainID] = useState<
    number | null
  >(null)
  const [selectedConfigGUID, setSelectedConfigGUID] = useState<string | null>(
    null,
  )
  const [showDomainPicker, setShowDomainPicker] = useState(false)
  const [isCopying, setIsCopying] = useState(false)

  const teamsQuery = useTeamsFiltered({
    teamType: 'ocDOMAIN',
    operation: 'ocVIEW',
  })

  // Load configs from the selected source domain - call all hooks unconditionally
  const topMenuConfigs = useTopMenuConfigs({
    domainID: selectedSourceDomainID || 0,
  })
  const homeConfigs = useHomeConfigs({
    domainID: selectedSourceDomainID || 0,
  })
  const masteryConfigs = useMasteryConfigs({
    domainID: selectedSourceDomainID || 0,
  })

  // Select which configs to use based on configType
  const sourceDomainConfigs =
    configType === 'ocTRYYBTOPMENU'
      ? topMenuConfigs
      : configType === 'ocMASTERYSTART'
        ? masteryConfigs
        : homeConfigs

  const createDomainUIConfigurationMutator =
    useDomainUIConfigurationCreateMutation({
      onSuccess: () => {
        // Success handled in handleCopyConfiguration
      },
    })

  // Filter configs to only show enabled or draft
  const availableConfigs = useMemo(() => {
    if (!sourceDomainConfigs.all_configs) return []

    return orderBy(
      sourceDomainConfigs.all_configs.filter(
        (config) =>
          config.activeStatus === 'ocENABLED' ||
          config.activeStatus === 'ocDRAFT',
      ),
      ['activeStatus'],
      ['desc'],
    )
  }, [sourceDomainConfigs.all_configs])

  const configOptions = useMemo(
    () =>
      availableConfigs.map((config) => ({
        value: config.UIconfigGUID,
        item: (
          <span className="flex flex-row gap-1">
            <Badge
              variant={
                config.activeStatus === 'ocENABLED' ? 'success' : 'warning'
              }
            >
              {config.activeStatus === 'ocENABLED' ? 'Live Config' : 'Draft'}
            </Badge>
            {config.configName || 'Untitled Config'}{' '}
          </span>
        ),
        properties: {
          configName: config.configName,
        },
      })),
    [availableConfigs],
  )

  const selectedSourceDomain = useMemo(() => {
    if (!selectedSourceDomainID || !teamsQuery.teams) return null
    return teamsQuery.teams.find((t) => t.teamID === selectedSourceDomainID)
  }, [selectedSourceDomainID, teamsQuery.teams])

  const handleCopyConfiguration = async () => {
    if (!selectedConfigGUID) {
      toast.toastError({
        description: 'Please select a configuration to copy',
      })
      return
    }

    setIsCopying(true)

    try {
      const configResult = await tytoClient.DomainUIConfiguration.get({
        UIconfigGUID: selectedConfigGUID ?? '',
      })

      if (!configResult?.UIConfiguration) {
        throw new Error('Configuration not found')
      }

      if (!configResult.UIConfiguration.mainBody) {
        throw new Error('Configuration has no main body')
      }

      // Parse and copy the mainBody from the selected config
      const mainBodyData =
        typeof configResult.UIConfiguration.mainBody === 'string'
          ? configResult.UIConfiguration.mainBody
          : JSON.stringify(configResult.UIConfiguration.mainBody)

      const configName =
        configOptions.find((c) => c.value === selectedConfigGUID)?.properties
          ?.configName || 'Untitled Config'

      await createDomainUIConfigurationMutator.mutateAsync({
        UIconfigGUID: '', // Empty for new config
        configType,
        mainBody: mainBodyData,
        mimeType: 'application/json',
        mainBodyIsValid: configResult.UIConfiguration.mainBodyIsValid ?? true,
        attachments: [], // Don't copy attachments - user can add them later
        domainID,
        configName: `Copy of ${configName}`,
        configDescription: `Copied from ${selectedSourceDomain?.name || 'another domain'}`,
      })

      toast.toastSuccess({
        description: 'Configuration copied successfully',
      })

      onSuccess()
    } catch (err: unknown) {
      const errorMessage =
        (err as { message?: string })?.message ||
        (err as { technical?: string })?.technical ||
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        'Failed to copy configuration'
      toast.toastError({
        description: errorMessage,
      })
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <>
      <span className="opacity-3 text-grayscale-500 py-2 text-sm">
        Copy a configuration from another domain to use as a starting point.
      </span>

      <div className="my-6 flex flex-col gap-4">
        {/* Domain Selection */}
        <div>
          <TextBody className="text-site-fg mb-2 font-semibold">
            Source Domain
          </TextBody>
          <Button variant="secondary" onClick={() => setShowDomainPicker(true)}>
            <div className="flex items-center gap-2">
              <Icon icon="search" />
              <span>
                {selectedSourceDomain
                  ? selectedSourceDomain.name
                  : 'Choose Domain'}
              </span>
            </div>
          </Button>
        </div>

        {/* Configuration Selection */}
        {selectedSourceDomainID && (
          <div>
            <TextBody className="text-site-fg mb-2 font-semibold">
              Configuration to Copy
            </TextBody>
            {sourceDomainConfigs.isPending ? (
              <TextBody>Loading configurations...</TextBody>
            ) : availableConfigs.length > 0 ? (
              <ComboBox
                items={configOptions}
                value={selectedConfigGUID || ''}
                onChange={(value) => setSelectedConfigGUID(value)}
                selectPlaceholder="Select a configuration"
                includeSearch
                id="config-combobox"
                aria-label="Select Configuration"
              />
            ) : (
              <TextBody className="text-grayscale-500">
                No configurations found for this domain
              </TextBody>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-grayscale-400 flex justify-end gap-2 border-t pt-4">
          <Button variant="secondary" onClick={onCancel}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleCopyConfiguration}
            disabled={
              isCopying || !selectedSourceDomainID || !selectedConfigGUID
            }
          >
            {isCopying ? 'Copying...' : 'Copy Configuration'}
          </Button>
        </div>
      </div>

      {/* Domain Picker Dialog */}
      <Dialog
        open={showDomainPicker}
        onOpenChange={setShowDomainPicker}
        title="Choose Domain"
        maxWidth="lg"
        maxHeight="screen"
      >
        <div className="h-[70vh]">
          <TeamTreeInput
            teams={teamsQuery.teams ?? []}
            isLoading={teamsQuery.isPending}
            onSelect={(teamID, teamType) => {
              if (teamID && teamType === 'ocDOMAIN') {
                setSelectedSourceDomainID(teamID)
                setSelectedConfigGUID(null) // Reset config selection
                setShowDomainPicker(false)
              }
            }}
            projectsIncluded={false}
            teamsIncluded={false}
          />
        </div>
      </Dialog>
    </>
  )
}
