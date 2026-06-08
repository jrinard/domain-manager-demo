import type {
  SectionRenderMode,
  CatalogNewsSection as CatalogNewsSectionType,
} from '@domain/configs'
import type { CatalogNewsSectionData } from '@domain/schemas'

import { HomeSectionWrapper } from '../home-section-wrapper/'
import { CatalogNewsDataComponent } from './CatalogNewsData'
import { CatalogNewsMockData } from './CatalogNewsMockData'

export interface CatalogNewsSectionProps {
  section: CatalogNewsSectionType | null
  dynamic_section_data?: CatalogNewsSectionType['dynamic_section_data'] & {
    domainID?: number
  }
  renderMode?: SectionRenderMode
}

export const CatalogNewsSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: CatalogNewsSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: CatalogNewsSectionData = {
    ...section.section_data,
    ...dynamic_section_data,
  }

  const domainID = dynamic_section_data?.domainID
  const foo = false

  if (renderMode === 'mock' && foo) {
    return (
      <HomeSectionWrapper
        section={section}
        fallbackLayoutPosition={{
          columnSpan: 'full',
        }}
        padding={section.metadata.padding}
      >
        <CatalogNewsMockData section={section} sectionData={sectionData} />
      </HomeSectionWrapper>
    )
  }

  if (!domainID) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
      padding={section.metadata.padding}
    >
      <CatalogNewsDataComponent
        section={section}
        sectionData={sectionData}
        domainID={domainID}
      />
    </HomeSectionWrapper>
  )
}

// Re-export types
export type { NewsCategory, NewsItem } from './types'
export { CatalogNews } from './CatalogNews'
export { CatalogNewsDataComponent } from './CatalogNewsData'
