import { useState, useMemo } from 'react'
import { orderBy } from 'lodash'
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
import { DOMAIN_MANAGER_PATHS } from '../../../data/constants'
import { DEFAULT_CONFIGS } from '@domain/configs'
import { TeamTreeInput } from '@spacedock/starliner'
import { useTytoClient } from '@tyto/client'
import {
  useDomainUIConfigurationCreateMutation,
  useDomainUIConfigurationUpdateMutation,
} from '@tyto/query'

import { useHomeConfigs } from '../../../data/hooks/useEditableUIConfig'
import { useTeamsFiltered } from '../../../data/hooks'

interface InitialHomeConfigProps {
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
        bg-contrast-low w-full cursor-pointer rounded-md border
        p-4 transition-all
        ${selected ? 'border-primary ring-primary ring-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            rounded-lg p-3
            ${selected ? 'bg-primary text-primary-fg' : 'bg-bg-contrast-medium text-site-fg'}
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

export const InitialHomeConfig = (props: InitialHomeConfigProps) => {
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
  const selectedDomainConfigs = useHomeConfigs({
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

    return orderBy(
      selectedDomainConfigs.all_configs.filter(
        (config) =>
          config.activeStatus === 'ocENABLED' ||
          config.activeStatus === 'ocDRAFT',
      ),
      ['activeStatus'],
      ['desc'],
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
      // Use the CLEAN_HOME_CONFIG_DEFAULT so initial config includes welcome section
      const freshConfig = JSON.parse(
        JSON.stringify(DEFAULT_CONFIGS.HOME_CONFIG),
      )
      // Ensure the welcome button points to the domain's tryyb editor
      try {
        if (
          freshConfig.sections &&
          freshConfig.sections[0] &&
          freshConfig.sections[0].section_data &&
          Array.isArray(freshConfig.sections[0].section_data.buttons) &&
          freshConfig.sections[0].section_data.buttons[0]
        ) {
          freshConfig.sections[0].section_data.buttons[0].url = `${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${props.domainID}/tryyb`
        }
      } catch (err) {
        // ignore if structure unexpected
      }

      await createConfigMutation.mutateAsync({
        UIconfigGUID: '', // Empty for new config
        configType: 'ocTRYYBSTART',
        mainBody: JSON.stringify(freshConfig),
        mimeType: 'application/json',
        mainBodyIsValid: true,
        attachments: [],
        domainID: props.domainID,
        configName: 'Initial Home Configuration',
        configDescription: 'Created by Domain Setup Wizard',
      })

      toast.toastSuccess({
        description: 'Fresh home configuration created',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to create home configuration',
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
        configType: 'ocTRYYBSTART',
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
          Initial Home Configuration
        </TextHeading>
        <TextBody className="text-grayscale-500 mt-2">
          Set up your domain's home page layout. Choose to start fresh or copy
          from an existing domain.
        </TextBody>
      </div>

      {/* Setup Mode Selection */}
      <div>
        <TextBody className="text-site-fg mb-3 font-semibold">
          Setup Method
        </TextBody>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <SelectableCard
            title="Copy from Existing"
            description="Use configuration from another domain"
            icon="content-copy"
            selected={setupMode === 'existing'}
            onClick={() => setSetupMode('existing')}
          />
          <SelectableCard
            title="Fresh Start"
            description="Create a new empty home configuration"
            icon="add-circle"
            selected={setupMode === 'fresh'}
            onClick={() => setSetupMode('fresh')}
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
                  id="config-combobox"
                  aria-label="Select Configuration"
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
      <div className="flex items-center justify-between border-b border-border pb-4 pt-2">
        <div>
          <Button
            variant="ghost-primary"
            onClick={() => {
              if (props.goToStep) props.goToStep('style-theme')
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
            <div className="flex items-center gap-2">
              {isCreating ? (
                'Creating...'
              ) : setupMode === 'fresh' ? (
                'Create Fresh Configuration'
              ) : (
                <>
                  <Icon icon="content-copy" />
                  <span>Copy Configuration</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Domain Picker Dialog */}
      <Dialog
        className="text-site-fg"
        open={showDomainPicker}
        onOpenChange={setShowDomainPicker}
        title="Choose Domain"
        maxWidth="lg"
        maxHeight="screen"
      >
        <div className="h-[70vh] bg-neutral-500">
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
