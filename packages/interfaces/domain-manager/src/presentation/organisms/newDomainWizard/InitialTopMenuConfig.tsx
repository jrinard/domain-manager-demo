import { useState, useMemo } from 'react'
import {
  Badge,
  TextHeading,
  TextBody,
  ComboBox,
  useToast,
  Dialog,
} from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { TeamTreeInput } from '@spacedock/starliner'
import {
  useDomainUIConfigurationCreateMutation,
  useDomainUIConfigurationUpdateMutation,
} from '@tyto/query'

import { useTopMenuConfigs } from '../../../data/hooks/useEditableUIConfig'
import { useTeamsFiltered } from '../../../data/hooks'
import { useTytoClient } from '@tyto/client'

interface InitialTopMenuConfigProps {
  domainID: number
  goToStep?: (
    step:
      | 'domain-images'
      | 'scheme-and-menu-preferences'
      | 'style-theme'
      | 'initial-home-config'
      | 'initial-top-menu-config'
      | 'overview',
  ) => void
}

type SetupMode = 'fresh' | 'existing'

interface SelectableCardProps {
  title: string
  description: string
  icon: string
  selected: boolean
  onClick: () => void
}

const SelectableCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
}: SelectableCardProps) => {
  return (
    <div
      className={`
        hover:border-primary border-bg-contrast-medium
        bg-bg-contrast-low w-full cursor-pointer rounded-md border
        p-4 transition-all
        ${selected ? 'border-primary ring-primary ring-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            rounded-lg p-3
            ${selected ? 'bg-primary text-primary-fg' : 'text-site-fg bg-bg-contrast-medium'}
          `}
        >
          <Icon icon={icon} size="lg" />
        </div>
        <div className="flex-1">
          <div className="text-site-fg mb-1 font-medium">{title}</div>
          <TextBody className="text-grayscale-500 text-xs">
            {description}
          </TextBody>
        </div>
        {selected && (
          <div className="text-primary">
            <Icon icon="checkmark-circle" size="lg" />
          </div>
        )}
      </div>
    </div>
  )
}

export const InitialTopMenuConfig = (props: InitialTopMenuConfigProps) => {
  const tytoClient = useTytoClient()
  const toast = useToast()
  const [setupMode, setSetupMode] = useState<SetupMode>('fresh')
  const [selectedDomainID, setSelectedDomainID] = useState<number | null>(null)
  const [selectedConfigGUID, setSelectedConfigGUID] = useState<string | null>(
    null,
  )
  const [showDomainPicker, setShowDomainPicker] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const teamsQuery = useTeamsFiltered({
    teamType: 'ocDOMAIN',
    operation: 'ocVIEW',
  })

  // Load configs from the selected domain
  const selectedDomainConfigs = useTopMenuConfigs({
    domainID: selectedDomainID || 0,
  })

  const createConfigMutation = useDomainUIConfigurationCreateMutation({
    onSuccess: () => {
      // Success handled in handleCreate
    },
  })

  const updateConfigMutation = useDomainUIConfigurationUpdateMutation({
    onSuccess: () => {
      // Success handled in handleCopyFromExisting
    },
  })

  // Filter configs to only show enabled or draft
  const availableConfigs = useMemo(() => {
    if (!selectedDomainConfigs.all_configs) return []

    return selectedDomainConfigs.all_configs.filter(
      (config) =>
        config.activeStatus === 'ocENABLED' ||
        config.activeStatus === 'ocDRAFT',
    )
  }, [selectedDomainConfigs.all_configs])

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

  const selectedDomain = useMemo(() => {
    if (!selectedDomainID || !teamsQuery.teams) return null
    return teamsQuery.teams.find((t) => t.teamID === selectedDomainID)
  }, [selectedDomainID, teamsQuery.teams])

  const handleCreateFreshConfig = async () => {
    setIsCreating(true)

    try {
      // Create a fresh config with minimal structure for top menu
      const freshConfig = {
        config_version: '1',
        id: '1',
        menuItems: [],
      }

      await createConfigMutation.mutateAsync({
        UIconfigGUID: '', // Empty for new config
        configType: 'ocTRYYBTOPMENU',
        mainBody: JSON.stringify(freshConfig),
        mimeType: 'application/json',
        mainBodyIsValid: true,
        attachments: [],
        domainID: props.domainID,
        configName: 'Initial Top Menu Configuration',
        configDescription: 'Created by Domain Setup Wizard',
      })

      toast.toastSuccess({
        description: 'Fresh top menu configuration created',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to create top menu configuration',
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyFromExisting = async () => {
    if (!selectedConfigGUID) {
      toast.toastError({
        description: 'Please select a configuration to copy',
      })
      return
    }

    setIsCreating(true)

    try {
      const configResult = await tytoClient.DomainUIConfiguration.get({
        UIconfigGUID: selectedConfigGUID ?? '',
      })

      if (
        !configResult?.UIConfiguration?.mainBody ||
        !configResult?.UIConfiguration?.mainBodyIsValid
      ) {
        throw new Error('Configuration not found or invalid')
      }

      // Parse and copy the mainBody from the selected config
      const mainBodyData =
        typeof configResult.UIConfiguration.mainBody === 'string'
          ? configResult.UIConfiguration.mainBody
          : JSON.stringify(configResult.UIConfiguration.mainBody)

      const configName =
        configOptions.find((c) => c.value === selectedConfigGUID)?.properties
          ?.configName || 'selectedConfigGUID'

      const createResult = await createConfigMutation.mutateAsync({
        UIconfigGUID: '', // Empty for new config
        configType: 'ocTRYYBTOPMENU',
        mainBody: mainBodyData,
        mimeType: 'application/json',
        mainBodyIsValid: true,
        attachments: [],
        domainID: props.domainID,
        configName: `Copy of ${configName}`,
        configDescription: `Copied from ${selectedDomain?.name || 'another domain'} by Domain Setup Wizard`,
      })

      // Immediately publish the config as enabled
      if (createResult?.UIconfigGUID) {
        await updateConfigMutation.mutateAsync({
          UIconfigGUID: createResult.UIconfigGUID,
          activeStatus: 'ocENABLED',
        })
      }

      toast.toastSuccess({
        description: 'Configuration copied and published successfully',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to copy configuration',
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreate = () => {
    if (setupMode === 'fresh') {
      handleCreateFreshConfig()
    } else {
      handleCopyFromExisting()
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <TextHeading className="text-site-fg">
          Initial Top Menu Configuration
        </TextHeading>
        <TextBody className="text-grayscale-500 mt-2">
          Set up your domain's top navigation menu. Choose to start fresh or
          copy from an existing domain.
        </TextBody>
      </div>

      {/* Setup Mode Selection */}
      <div>
        <TextBody className="text-site-fg mb-3 font-semibold">
          Setup Method
        </TextBody>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <SelectableCard
            title="Fresh Start"
            description="Create a new empty top menu configuration"
            icon="add-circle"
            selected={setupMode === 'fresh'}
            onClick={() => setSetupMode('fresh')}
          />
          <SelectableCard
            title="Copy from Existing"
            description="Use configuration from another domain"
            icon="content-copy"
            selected={setupMode === 'existing'}
            onClick={() => setSetupMode('existing')}
          />
        </div>
      </div>

      {/* Existing Domain Configuration */}
      {setupMode === 'existing' && (
        <div className="space-y-4">
          {/* Domain Selection */}
          <div>
            <TextBody className="text-site-fg mb-2 font-semibold">
              Source Domain
            </TextBody>
            <Button
              variant="secondary"
              onClick={() => setShowDomainPicker(true)}
            >
              <div className="flex items-center gap-2">
                <Icon icon="search" />
                <span>
                  {selectedDomain ? selectedDomain.name : 'Choose Domain'}
                </span>
              </div>
            </Button>
          </div>

          {/* Configuration Selection */}
          {selectedDomainID && (
            <div>
              <TextBody className="text-site-fg mb-2 font-semibold">
                Configuration to Copy
              </TextBody>
              {selectedDomainConfigs.isPending ? (
                <TextBody>Loading configurations...</TextBody>
              ) : availableConfigs.length > 0 ? (
                <ComboBox
                  items={configOptions}
                  value={selectedConfigGUID || ''}
                  onChange={(value) => setSelectedConfigGUID(value)}
                  selectPlaceholder="Select a configuration"
                  includeSearch
                  id="top-menu-config-combobox"
                  aria-label="Select Top Menu Configuration"
                  triggerClassName="text-site-fg bg-bg-contrast-low border-bg-contrast-medium"
                />
              ) : (
                <TextBody className="text-grayscale-500">
                  No configurations found for this domain
                </TextBody>
              )}
            </div>
          )}
        </div>
      )}

      {/* Create Button with Back */}
      <div className="border-border flex items-center justify-between border-b pb-4 pt-2">
        <div>
          <Button
            variant="ghost-primary"
            onClick={() => {
              if (props.goToStep) props.goToStep('initial-home-config')
            }}
          >
            <span className="flex items-center gap-2">
              <Icon icon="chevron-left" />
              <span>Back</span>
            </span>
          </Button>
        </div>

        <div>
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={
              isCreating ||
              (setupMode === 'existing' &&
                (!selectedDomainID || !selectedConfigGUID))
            }
          >
            {isCreating
              ? 'Creating...'
              : setupMode === 'fresh'
                ? 'Create Fresh Configuration'
                : 'Copy Configuration'}
          </Button>
        </div>
      </div>

      {/* Domain Picker Dialog */}
      <Dialog
        open={showDomainPicker}
        onOpenChange={setShowDomainPicker}
        title={<span className="text-site-fg">Choose Domain</span>}
        maxWidth="lg"
        maxHeight="screen"
      >
        <div className="h-[70vh]">
          <TeamTreeInput
            teams={teamsQuery.teams ?? []}
            isLoading={teamsQuery.isPending}
            onSelect={(teamID, teamType) => {
              if (teamID && teamType === 'ocDOMAIN') {
                setSelectedDomainID(teamID)
                setSelectedConfigGUID(null) // Reset config selection
                setShowDomainPicker(false)
              }
            }}
            projectsIncluded={false}
            teamsIncluded={false}
          />
        </div>
      </Dialog>
    </div>
  )
}
