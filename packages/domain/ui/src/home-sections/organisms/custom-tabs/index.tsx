import type {
  SectionRenderMode,
  HomeSection,
  CustomTabsSection as CustomTabsSectionType,
} from '@domain/configs'
import type { CustomTabsSectionData } from '@domain/schemas'
import { CustomTabs } from './CustomTabs'
import { HomeSectionWrapper } from '../home-section-wrapper'

export interface CustomTabsSectionProps {
  section: HomeSection<CustomTabsSectionData> | null
  dynamic_section_data?: CustomTabsSectionType['dynamic_section_data'] & {
    domainID?: number
  }
  renderMode?: SectionRenderMode
  domainID?: number
}

export const CustomTabsSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: CustomTabsSectionProps) => {
  if (!section) return null

  const section_data = section.section_data as CustomTabsSectionData

  return (
    <HomeSectionWrapper<CustomTabsSectionData>
      section={section}
      fallbackLayoutPosition={{ columnSpan: 'full' }}
      padding={section.metadata.padding}
    >
      <CustomTabs
        section={section as any}
        sectionData={section_data as any}
        dynamic_section_data={dynamic_section_data}
        renderMode={renderMode}
      />
    </HomeSectionWrapper>
  )
}
