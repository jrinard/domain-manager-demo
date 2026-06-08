import type {
  SectionRenderMode,
  R3HeatmapSection as R3HeatmapSectionType,
} from '@domain/configs'
import type { R3HeatmapSectionData } from '@domain/schemas'
import { R3HeatmapDataComponent } from './R3HeatmapData'
import { R3HeatmapMockData } from './R3HeatmapMockData'

export interface R3HeatmapSectionProps {
  section: R3HeatmapSectionType | null
  dynamic_section_data?: R3HeatmapSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const R3HeatmapSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: R3HeatmapSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: R3HeatmapSectionData = {
    ...section.section_data,
    ...dynamic_section_data,
  }

  if (renderMode === 'mock') {
    return <R3HeatmapMockData section={section} sectionData={sectionData} />
  }

  return <R3HeatmapDataComponent section={section} sectionData={sectionData} />
}
