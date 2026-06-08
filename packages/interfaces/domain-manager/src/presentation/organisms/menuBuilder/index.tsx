import { MenuBuilder } from './MenuBuilder'
import { EMPTY_MENU_CONFIG } from './MenuDataFallback'

import { useTopMenuConfig } from '../../../data/hooks/useTopMenuConfig'
import { useTopMenuConfigs } from '../../../data/hooks/useEditableUIConfig'
import { useDomainProperties } from '../../../data/hooks/useDomainProperties'
export { MenuBuilder } from './MenuBuilder'

// TODO: Remove when endpoint wired

interface MenuBuilderWrapperProps {
  domainID?: number
  configID?: string
  className?: string
  menuOrientation?: string
}

export const MenuBuilderWrapper = ({
  domainID,
  configID,
  className,
  menuOrientation,
}: MenuBuilderWrapperProps) => {
  const topMenuConfigQuery = useTopMenuConfig({ configID: configID || '' })
  const topMenuConfigsQuery = useTopMenuConfigs({
    domainID: domainID || 0,
  })
  const { remoteDomainProperties } = useDomainProperties({
    domainID: domainID || 0,
  })

  // Show loading only while the query is actually pending
  if (topMenuConfigQuery.isPending) {
    return <div>Loading...</div>
  }

  // If there's an error, show error message
  if (topMenuConfigQuery.isError) {
    return (
      <div className="p-4 text-red-500">
        Error loading menu config:{' '}
        {topMenuConfigQuery.error?.message || 'Unknown error'}
      </div>
    )
  }

  // If config couldn't be parsed but we have data, show parsing error
  if (topMenuConfigQuery.parsingError && !topMenuConfigQuery.topMenuConfig) {
    return (
      <div className="p-4 text-yellow-500">
        Warning: Could not parse menu config. {topMenuConfigQuery.parsingError}
      </div>
    )
  }

  return (
    <MenuBuilder
      domainID={domainID}
      configID={configID}
      className={className}
      initialConfig={topMenuConfigQuery.topMenuConfig ?? EMPTY_MENU_CONFIG}
      menuOrientation={menuOrientation}
      isPublished={topMenuConfigQuery.data?.activeStatus === 'ocENABLED'}
      saveConfig={topMenuConfigQuery.saveConfigChanges}
      publishConfig={topMenuConfigQuery.publishConfig}
      reloadConfig={topMenuConfigQuery.refetch}
      reloadConfigsList={topMenuConfigsQuery.refetch}
      cloneConfig={topMenuConfigQuery.cloneConfig}
      saveMetadata={topMenuConfigQuery.saveConfigMetadataChangesForMenu}
      currentConfigName={topMenuConfigsQuery.all_configs?.find(
        (c) => c.UIconfigGUID === configID,
      )?.configName}
      isLoading={topMenuConfigQuery.isPending}
      libraryImages={topMenuConfigQuery.data?.libraryImages}
      libraryLessons={topMenuConfigQuery.data?.libraryLessons}
      colorSchemes={remoteDomainProperties.colorSchemes}
    />
  )
}

export default MenuBuilderWrapper
