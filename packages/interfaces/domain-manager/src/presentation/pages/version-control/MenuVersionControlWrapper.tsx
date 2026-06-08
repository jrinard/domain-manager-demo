import { useState } from 'react'
import { VersionControl } from './VersionControl'
import type { TytoData } from '@spacedock/manifest'
import { useToast } from '@spacedock/falcon-ui'
import { useDomainUIConfigurationUpdateMutation } from '@tyto/query'

import { useDomainProperties } from '../../../data/hooks/useDomainProperties'
import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'
import { useTopMenuConfigs } from '../../../data/hooks/useEditableUIConfig'

interface MenuVersionControlWrapperProps {
  domainID?: number
  teamID?: number
}

// Fake data showing list of available menu configs
const FAKEDATAMENU = [
  {
    id: 201,
    type: 'Main',
    activeStatus: true,
    name: 'Menu Config Main',
    description: 'Main menu configuration for navigation',
    releaseDate: '4/20/2025',
    modifiedBy: 'Joshua R',
    errorCheckPass: 'Done',
  },
  {
    id: 202,
    type: 'Preview',
    activeStatus: true,
    name: 'Menu_Config.102',
    description: 'Updated menu structure with new items',
    releaseDate: '4/18/2025',
    modifiedBy: 'Joshua R',
    errorCheckPass: 'Done',
  },
  {
    id: 203,
    type: '',
    activeStatus: false,
    name: 'Menu_Config.101',
    description: 'Previous menu version',
    releaseDate: '4/15/2025',
    lastModifiedDate: '04/15/2025',
    modifiedBy: 'Joshua R',
    errorCheckPass: 'Done',
  },
]

export const MenuVersionControlWrapper = ({
  domainID,
  teamID,
}: MenuVersionControlWrapperProps) => {
  const contextID = domainID || teamID || 0
  const domainIDForHooks = domainID || 0
  const toast = useToast()

  // TODO: Replace with real hook
  // const menuConfigsQuery = useMenuConfigs({ contextID })

  // Data layer - currently using fake data
  const liveData = FAKEDATAMENU.filter((x) => x.activeStatus)
  const otherData = FAKEDATAMENU.filter((x) => !x.activeStatus)
  const isLoading = Boolean(FAKEDATAMENU && FAKEDATAMENU.length === 0)

  // Domain properties hooks
  const { domainProperties } = useDomainProperties({
    domainID: domainIDForHooks,
  })
  const updateDomainUIMutator = useUpdateDomainUIMutation({
    domainID: domainIDForHooks,
  })

  const topMenuConfigsQuery = useTopMenuConfigs({
    domainID: domainIDForHooks,
  })

  const deleteConfigMutator = useDomainUIConfigurationUpdateMutation({
    onSuccess: () => {
      toast.toastSuccess({ description: 'Config Deleted' })
      topMenuConfigsQuery.refetch()
    },
  })

  // Sync menuType from domain properties
  const menuType = domainProperties?.menuType || 'top'

  // TODO: Replace with values from API/hook
  const [themeStyles, setThemeStyles] = useState<string>(
    'Custom from Theme Page',
  )

  const handleMenuTypeChange = (
    value: TytoData.DomainProperties['menuType'],
  ) => {
    updateDomainUIMutator
      .updateDomainUI({
        properties: {
          menuType: value,
        },
      })
      .then(() => {
        toast.toastSuccess({ description: 'Saved Menu Type' })
      })
      .catch(() => {
        toast.toastError({ description: 'Failed to save Menu Type' })
      })
  }

  const handleRefetch = () => {
    //TODO refresh the menu config data
    topMenuConfigsQuery.refetch()
  }

  return (
    <VersionControl
      isLoading={isLoading || deleteConfigMutator.isPending}
      liveData={liveData}
      otherData={otherData}
      contextID={contextID}
      activeConfigs={topMenuConfigsQuery.ocENABLED}
      disabledConfigs={topMenuConfigsQuery.ocDISABLED}
      draftConfigs={topMenuConfigsQuery.ocDRAFT}
      page="menu"
      canEdit //TODO Fix Later
      refetch={handleRefetch}
      menuType={menuType}
      onMenuTypeChange={handleMenuTypeChange}
      themeStyles={themeStyles}
      onThemeStylesChange={setThemeStyles}
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
