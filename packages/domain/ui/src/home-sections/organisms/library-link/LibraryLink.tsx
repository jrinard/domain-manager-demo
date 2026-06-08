import { BaLink } from '../../../business-academy/organisms/ba-link/BALink'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { HomeSection } from '@domain/configs'
import type { LibraryLinkSectionData } from '@domain/schemas'

export interface LibraryLinkProps {
  section?: HomeSection<LibraryLinkSectionData>
  sectionData: LibraryLinkSectionData
}

export const LibraryLink = ({ section, sectionData }: LibraryLinkProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 3,
      }}
    >
      <BaLink
        title={section.metadata?.display_name || 'Past Calls'}
        link=""
        app="library"
      />
    </HomeSectionWrapper>
  )
}
