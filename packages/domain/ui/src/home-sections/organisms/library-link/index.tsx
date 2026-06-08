import type { HomeSection, SectionRenderMode } from '@domain/configs'
import type { LibraryLinkSectionData } from '@domain/schemas'
import { LibraryLink } from './LibraryLink'

export interface LibraryLinkSectionProps {
  section: HomeSection<LibraryLinkSectionData> | null
  dynamic_section_data?: Partial<LibraryLinkSectionData>
  renderMode?: SectionRenderMode
}

export const LibraryLinkSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: LibraryLinkSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: LibraryLinkSectionData = {
    ...section.section_data,
    ...dynamic_section_data,
  }

  // No data layer needed - this is a simple link component
  // Mock, prod, and error modes all render the same
  return <LibraryLink section={section} sectionData={sectionData} />
}
