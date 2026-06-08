import type {
  SectionRenderMode,
  SearchSection as SearchSectionType,
} from '@domain/configs'
import { SearchDataComponent } from './SearchData'
import { SearchMockData } from './SearchMockData'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type { DomainUI } from '@spacedock/manifest'

export interface SearchSectionProps {
  section: SearchSectionType | null
  dynamic_section_data?: SearchSectionType['dynamic_section_data']
  attachments?: DomainUI.Attachment[]
  renderMode?: SectionRenderMode
  domainID?: number
}

export const SearchSection = ({
  section,
  dynamic_section_data,
  attachments,
  renderMode = 'prod',
  domainID,
}: SearchSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: SearchSectionType['section_data'] = {
    ...section.section_data,
    ...dynamic_section_data,
  }

  // In edit mode (mock), show non-functional placeholder
  if (renderMode === 'mock') {
    return (
      <HomeSectionWrapper
        section={section}
        fallbackLayoutPosition={{
          columnSpan: 12,
        }}
        attachments={attachments}
        padding={section.metadata.padding}
      >
        <SearchMockData
          section={section}
          sectionData={sectionData}
          attachments={attachments}
        />
      </HomeSectionWrapper>
    )
  }

  // In preview/production mode, show fully functional search
  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 12,
      }}
      attachments={attachments}
      padding={section.metadata.padding}
    >
      <SearchDataComponent
        section={section}
        sectionData={sectionData}
        attachments={attachments}
        domainID={domainID}
      />
    </HomeSectionWrapper>
  )
}

// Re-export components for consumers
export { Search } from './Search'
export { SearchDataComponent } from './SearchData'
