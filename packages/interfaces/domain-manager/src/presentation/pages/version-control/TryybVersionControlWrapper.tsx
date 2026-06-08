import { useState } from 'react'
import { VersionControl } from './VersionControl'
import type { TytoData } from '@spacedock/manifest'
import { useToast } from '@spacedock/falcon-ui'
import { useDomainUIConfigurationUpdateMutation } from '@tyto/query'

import { useDomainProperties } from '../../../data/hooks/useDomainProperties'
import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'

import { useHomeConfigs } from '../../../data/hooks/useEditableUIConfig'

interface TryybVersionControlWrapperProps {
  domainID?: number
  teamID?: number
}

export const TryybVersionControlWrapper = ({
  domainID,
  teamID,
}: TryybVersionControlWrapperProps) => {
  const contextID = domainID || teamID || 0
  const domainIDForHooks = domainID || 0
  const toast = useToast()

  // Domain properties hooks
  const { domainProperties } = useDomainProperties({
    domainID: domainIDForHooks,
  })
  const updateDomainUIMutator = useUpdateDomainUIMutation({
    domainID: domainIDForHooks,
  })

  const homeConfigsQuery = useHomeConfigs({
    domainID: domainIDForHooks,
  })

  const isLoading = homeConfigsQuery.isPending

  const deleteConfigMutator = useDomainUIConfigurationUpdateMutation({
    onSuccess: () => {
      toast.toastSuccess({ description: 'Config Deleted' })
      homeConfigsQuery.refetch()
    },
  })

  // TODO: Replace with values from API/hook
  const [startVersion, setStartVersion] = useState<string>('Home')
  const [themeStyles, setThemeStyles] = useState<string>(
    'Custom from Theme Page',
  )

  // Sync colorSchemes from domain properties
  const colorSchemes = domainProperties?.colorSchemes || 'dark'

  const handleColorSchemesChange = (
    value: TytoData.DomainProperties['colorSchemes'],
  ) => {
    updateDomainUIMutator
      .updateDomainUI({
        properties: {
          colorSchemes: value,
        },
      })
      .then(() => {
        toast.toastSuccess({ description: 'Successfuly Saved Color Scheme' })
      })
      .catch(() => {
        toast.toastError({ description: 'Failed to save Color Scheme' })
      })
  }

  const handleRefetch = () => {
    homeConfigsQuery.refetch()
  }

  return (
    <VersionControl
      isLoading={isLoading}
      liveData={[]}
      otherData={[]}
      contextID={contextID}
      activeConfigs={homeConfigsQuery.ocENABLED}
      disabledConfigs={homeConfigsQuery.ocDISABLED}
      draftConfigs={homeConfigsQuery.ocDRAFT}
      page="tryyb"
      canEdit //TODO Fix Later
      refetch={handleRefetch}
      startVersion={startVersion}
      themeStyles={themeStyles}
      onStartVersionChange={setStartVersion}
      onThemeStylesChange={setThemeStyles}
      colorSchemes={colorSchemes}
      onColorSchemesChange={handleColorSchemesChange}
      onDeleteConfig={(configID) => {
        if (!configID) {
          toast.toastError({
            description:
              'Config Identified Unexpectedly Missing. Could not Delete Config.',
          })
        } else {
          const shouldDelete = window.confirm('Delete Top Menu Config?')

          if (!shouldDelete) {
            return
          }

          deleteConfigMutator.mutate({
            UIconfigGUID: configID,
            activeStatus: 'ocDRAFTABANDON',
          })
        }
      }}
    />
  )
}
