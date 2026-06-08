import type {
  SectionRenderMode,
  R3FullSection as R3FullSectionType,
} from '@domain/configs'
import { R3FullDataComponent } from './R3FullData'
import { R3FullMockData } from './R3FullMockData'

export interface R3FullSectionProps {
  section: R3FullSectionType | null
  dynamic_section_data?: R3FullSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const R3FullSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: R3FullSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: R3FullSectionType['section_data'] = section.section_data

  if (renderMode === 'mock') {
    return <R3FullMockData section={section} sectionData={sectionData} />
  }

  return <R3FullDataComponent section={section} sectionData={sectionData} />
}

export { R3Full } from './R3Full'
export type { R3FullProps } from './R3Full'
