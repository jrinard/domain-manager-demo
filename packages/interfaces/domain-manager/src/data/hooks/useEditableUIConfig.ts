import { groupBy } from 'lodash'
import { useMemo } from 'react'
import { useDomainUIConfigurationsQuery } from '@tyto/query'
import type { DomainUI } from '@spacedock/manifest'

export function useEditableUIConfigs({
  domainID,
  configType,
  disabled,
}: {
  domainID: number
  configType: 'ocTRYYBSTART' | 'ocTRYYBTOPMENU' | 'ocMASTERYSTART'
  disabled?: boolean
}) {
  const configsQuery = useDomainUIConfigurationsQuery({
    configType,
    domainID,
    disabled,
  })

  const configsByStatus = useMemo((): Record<
    DomainUI.UIConfigActiveStatus,
    DomainUI.ListUIConfiguration[]
  > => {
    return groupBy(
      configsQuery.data?.UIConfigurations,
      'activeStatus',
    ) as Record<DomainUI.UIConfigActiveStatus, DomainUI.ListUIConfiguration[]>
  }, [configsQuery.data?.UIConfigurations])

  return {
    ...configsByStatus,
    isPending: configsQuery.isPending,
    isError: configsQuery.isError,
    error: configsQuery.error,
    uiConfig: configsQuery.data?.UIConfigurations,
    refetch: configsQuery.refetch,
    invalidate: configsQuery.invalidate,
    all_configs: configsQuery.data?.UIConfigurations,
  }
}

export function useHomeConfigs({
  domainID,
  disabled,
}: {
  domainID: number
  disabled?: boolean
}) {
  return useEditableUIConfigs({
    domainID,
    configType: 'ocTRYYBSTART',
    disabled,
  })
}

export function useTopMenuConfigs({
  domainID,
  disabled,
}: {
  domainID: number
  disabled?: boolean
}) {
  return useEditableUIConfigs({
    domainID,
    configType: 'ocTRYYBTOPMENU',
    disabled,
  })
}
export function useMasteryConfigs({
  domainID,
  disabled,
}: {
  domainID: number
  disabled?: boolean
}) {
  return useEditableUIConfigs({
    domainID,
    configType: 'ocMASTERYSTART',
    disabled,
  })
}
