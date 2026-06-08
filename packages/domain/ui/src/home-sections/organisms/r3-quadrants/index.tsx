import type {
  SectionRenderMode,
  R3QuadrantsSection as R3QuadrantsSectionType,
} from '@domain/configs'
import { R3QuadrantsDataComponent } from './R3QuadrantsData'
import { R3QuadrantsMockData } from './R3QuadrantsMockData'

export interface R3QuadrantsSectionProps {
  section: R3QuadrantsSectionType | null
  dynamic_section_data?: R3QuadrantsSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const R3QuadrantsSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: R3QuadrantsSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: R3QuadrantsSectionType['section_data'] =
    section.section_data

  if (renderMode === 'mock') {
    return <R3QuadrantsMockData section={section} sectionData={sectionData} />
  }

  return (
    <R3QuadrantsDataComponent section={section} sectionData={sectionData} />
  )
}
