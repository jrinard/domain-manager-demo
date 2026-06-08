import { useMemo } from 'react'
import type {
  SectionRenderMode,
  HomeSection,
  CustomTabsSection as CustomTabsSectionType,
} from '@domain/configs'
import type { CustomTabsSectionData } from '@domain/schemas'

import { ItemsGroup } from '../items-group/ItemsGroup'
import { useAssignedCustomTabs } from '../../hooks/useAssignedCustomTabs'
import { useMenuItemsAsLinks } from '../../hooks/useMenuItemsAsLinks'

export const CustomTabs = ({
  section,
  sectionData,
  dynamic_section_data,
  renderMode = 'prod',
}: {
  section: HomeSection<CustomTabsSectionData>
  sectionData: CustomTabsSectionData
  renderMode?: SectionRenderMode
  dynamic_section_data?: CustomTabsSectionType['dynamic_section_data'] & {
    domainID?: number
  }
}) => {
  const { customTabs, isLoading, error } = useAssignedCustomTabs({
    disabled: renderMode !== 'prod',
  })

  const { icon_display } = sectionData

  // Convert menu items to link format
  const linkItems = useMenuItemsAsLinks({
    menuItems: customTabs,
    icon_display,
  })

  // Create the items-group data with the converted links
  const itemsGroupData = useMemo(() => {
    return {
      ...sectionData,
      items: linkItems,
    }
  }, [sectionData, linkItems])

  // Handle loading and error states
  if (renderMode === 'prod' && isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading custom tabs...
      </div>
    )
  }

  if (renderMode === 'prod' && error) {
    return (
      <div className="flex h-full w-full items-center justify-center text-red-500">
        Error loading custom tabs
      </div>
    )
  }

  // Render mock data for preview/mock mode
  if (renderMode === 'mock' && !customTabs.length) {
    const mockData = {
      ...sectionData,
      items: [
        {
          sub_type: 'custom-tab' as const,
          traitID: 1,
          icon_display: icon_display,
        },
        {
          sub_type: 'custom-tab' as const,
          traitID: 2,
          icon_display: icon_display,
        },
      ],
    }

    return (
      <ItemsGroup
        section={section as any}
        sectionData={mockData}
        dynamic_section_data={{
          ...(dynamic_section_data as any),
          hideArrow: (sectionData as any).hideArrow,
          itemBgColor: (sectionData as any).itemBgColor,
          itemTextColor: (sectionData as any).itemTextColor,
          cardSize: (sectionData as any).cardSize,
          rounding: (section as any)?.metadata?.rounding,
        }}
        renderMode={renderMode}
      />
    )
  }

  // Render the ItemsGroup with converted custom tabs
  return (
    <ItemsGroup
      section={section as any}
      sectionData={itemsGroupData}
      dynamic_section_data={{
        ...(dynamic_section_data as any),
        hideArrow: (sectionData as any).hideArrow,
        itemBgColor: (sectionData as any).itemBgColor,
        itemTextColor: (sectionData as any).itemTextColor,
        cardSize: (sectionData as any).cardSize,
        rounding: (section as any)?.metadata?.rounding,
      }}
      renderMode={renderMode}
    />
  )
}
