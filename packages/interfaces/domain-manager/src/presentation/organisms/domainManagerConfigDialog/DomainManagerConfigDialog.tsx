import { useState, useMemo } from 'react'
import { noop } from 'lodash'
import { Dialog, useToast } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { Button } from '@falcon/buttons'
import { DEFAULT_CONFIGS } from '@domain/configs'
import { useScreenSize } from '@domain/ui'
import { useTytoClient } from '@tyto/client'
import { useDomainUIConfigurationCreateMutation } from '@tyto/query'

import { menuDataFallbackCV } from '../menuBuilder/MenuDataFallback'
import { DomainManagerConfigDialogCopyDomain } from './DomainManagerConfigDialogCopyDomain'
import {
  useHomeConfigs,
  useTopMenuConfigs,
  useMasteryConfigs,
} from '../../../data/hooks/useEditableUIConfig'

export interface DomainManagerConfigDialogProps {
  id: number
  open: boolean
  onOpenChange: (val: boolean) => void
  onSuccess: () => void
  domainID: number
  page:
    | 'tryyb'
    | 'menu'
    | 'mastery'
    | 'images'
    | 'custom-names'
    | 'r3'
    | 'services'
}

const DomainManagerConfigDialog = ({
  id,
  open,
  onOpenChange,
  onSuccess,
  domainID,
  page,
}: DomainManagerConfigDialogProps) => {
  const toast = useToast()
  const screenSizeData = useScreenSize()
  const isMobile = screenSizeData.semanticScreenWidth === 'mobile'
  const tytoClient = useTytoClient()
  const [showCopyFromDomain, setShowCopyFromDomain] = useState(false)
  const [isCloningFromLive, setIsCloningFromLive] = useState(false)
  const configType =
    page === 'menu'
      ? 'ocTRYYBTOPMENU'
      : page === 'mastery'
        ? 'ocMASTERYSTART'
        : 'ocTRYYBSTART'

  // Load configs to find the live one - call all hooks unconditionally
  const topMenuConfigs = useTopMenuConfigs({ domainID })
  const homeConfigs = useHomeConfigs({ domainID })
  const masteryConfigs = useMasteryConfigs({ domainID })

  // Select which configs to use based on page type
  const currentDomainConfigs =
    page === 'menu'
      ? topMenuConfigs
      : page === 'mastery'
        ? masteryConfigs
        : homeConfigs

  // Find the live (ocENABLED) config
  const liveConfig = useMemo(() => {
    if (!currentDomainConfigs.all_configs) return null
    return currentDomainConfigs.all_configs.find(
      (config) => config.activeStatus === 'ocENABLED',
    )
  }, [currentDomainConfigs.all_configs])

  const createDomainUIConfigurationMutator =
    useDomainUIConfigurationCreateMutation({
      onSuccess: noop,
    })

  const handleCloneFromLive = async () => {
    if (!liveConfig) {
      toast.toastError({
        description: 'No live configuration found to copy',
      })
      return
    }

    setIsCloningFromLive(true)

    try {
      // Get the full config details
      const configResult = await tytoClient.DomainUIConfiguration.get({
        UIconfigGUID: liveConfig.UIconfigGUID,
      })

      if (!configResult?.UIConfiguration?.mainBody) {
        throw new Error('Live configuration has no main body')
      }

      // Parse and copy the mainBody from the live config
      const mainBodyData =
        typeof configResult.UIConfiguration.mainBody === 'string'
          ? configResult.UIConfiguration.mainBody
          : JSON.stringify(configResult.UIConfiguration.mainBody)

      await createDomainUIConfigurationMutator.mutateAsync({
        UIconfigGUID: '', // Empty for new config
        configType,
        mainBody: mainBodyData,
        mimeType: 'application/json',
        mainBodyIsValid: configResult.UIConfiguration.mainBodyIsValid ?? true,
        attachments: [], // Don't copy attachments
        domainID,
        configName: `Copy of ${liveConfig.configName || 'Live Config'}`,
        configDescription: 'Copied from live configuration',
      })

      toast.toastSuccess({
        description: 'Configuration copied from live successfully',
      })

      onSuccess()
    } catch (err: unknown) {
      const errorMessage =
        (err as { message?: string })?.message ||
        (err as { technical?: string })?.technical ||
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ||
        'Failed to copy configuration from live'
      toast.toastError({
        description: errorMessage,
      })
    } finally {
      setIsCloningFromLive(false)
    }
  }

  return (
    <Dialog
      maxWidth="xxl"
      maxHeight="screen"
      open={open}
      onOpenChange={onOpenChange}
      title="Create Config Options"
    >
      {!showCopyFromDomain ? (
        <>
          <span className="opacity-3 text-grayscale-500 py-2 text-sm">
            The config drives the structure of the start page. You have multiple
            options for creating a configuration.
          </span>

          {/* Grid container: 1 column mobile, 3 columns desktop */}
          <div className="my-6 grid w-full gap-4 sm:grid-cols-3">
            {/* Column 1 */}
            <Button
              variant="shadow"
              className="flex w-full flex-col items-start rounded border border-gray-200 p-4 text-left sm:h-[80px] md:h-[180px] lg:h-[180px]"
              disabled={
                createDomainUIConfigurationMutator.isPending ||
                isCloningFromLive ||
                !liveConfig
              }
              onClick={handleCloneFromLive}
            >
              <div className="flex items-center gap-2">
                <Icon color="current" icon="file-document-check" size="6xl" />
                <div className="font-body text-base font-medium uppercase leading-tight tracking-tighter transition-all duration-200 ease-in focus-visible:ring-2 focus-visible:ring-offset-2">
                  CREATE NEW CONFIG FROM LIVE
                </div>
              </div>
              {!isMobile && (
                <span className="text-grayscale-500 mt-2 text-xs leading-tight hover:text-white">
                  Creates a config from a copy of the main live config as the
                  starting place. It is then placed into Other Versions for more
                  customizations.
                </span>
              )}
            </Button>

            {/* Column 2 */}
            <Button
              variant="shadow"
              className="flex w-full flex-col items-start rounded border border-gray-200 p-4 text-left sm:h-[80px] md:h-[180px] lg:h-[180px]"
              disabled={createDomainUIConfigurationMutator.isPending}
              onClick={() => setShowCopyFromDomain(true)}
            >
              <div className="flex items-center gap-2">
                <Icon
                  color="current"
                  icon="file-document-multiple"
                  size="5xl"
                />
                <div className="font-body text-base font-medium uppercase leading-tight tracking-tighter transition-all duration-200 ease-in focus-visible:ring-2 focus-visible:ring-offset-2">
                  CREATE NEW CONFIG FROM ANOTHER DOMAIN
                </div>
              </div>
              {!isMobile && (
                <span className="text-grayscale-500 mt-2 text-xs leading-tight hover:text-white">
                  Select another domain or team to copy the live version. It
                  will appear in Other Versions for further customization.
                </span>
              )}
            </Button>

            {/* Column 3 - Full height */}
            <Button
              variant="shadow"
              className="flex w-full flex-col items-start rounded border border-gray-200 p-4 text-left sm:h-[80px] md:h-[180px] lg:h-[180px]"
              disabled={createDomainUIConfigurationMutator.isPending}
              onClick={() => {
                let body
                if (page === 'menu') {
                  body = menuDataFallbackCV
                } else if (page === 'mastery') {
                  body = DEFAULT_CONFIGS.MASTERY_CONFIG
                } else {
                  body = DEFAULT_CONFIGS.HOME_CONFIG
                }

                createDomainUIConfigurationMutator
                  .mutateAsync({
                    configType,
                    mainBody: JSON.stringify(body),
                    mimeType: 'application/json',
                    domainID,
                    attachments: [],
                  })
                  .then(onSuccess)
              }}
            >
              <div className="flex items-center gap-2">
                <Icon color="current" icon="plus-circle-outline" size="5xl" />
                <div className="font-body text-base font-medium uppercase leading-tight tracking-tighter transition-all duration-200 ease-in focus-visible:ring-2 focus-visible:ring-offset-2">
                  CREATE NEW CLEAN CONFIG
                </div>
              </div>
              {!isMobile && (
                <span className="text-grayscale-500 mt-2 text-xs leading-tight hover:text-white">
                  Creates a brand new configuration from scratch using default
                  settings. It will appear in Other Versions where you can
                  customize it before making it live.
                </span>
              )}
            </Button>
          </div>
        </>
      ) : (
        <DomainManagerConfigDialogCopyDomain
          domainID={domainID}
          configType={configType}
          onSuccess={() => {
            setShowCopyFromDomain(false)
            onSuccess()
          }}
          onCancel={() => setShowCopyFromDomain(false)}
        />
      )}
    </Dialog>
  )
}

DomainManagerConfigDialog.displayName = 'DomainManagerConfigDialog'

export { DomainManagerConfigDialog }
