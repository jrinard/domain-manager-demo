import type {
  SectionRenderMode,
  NextTrainingSection as NextTrainingSectionType,
} from '@domain/configs'
import type { NextTrainingSectionData } from '@domain/schemas'
import { NextTraining } from './NextTraining'

export interface NextTrainingSectionProps {
  section: NextTrainingSectionType | null
  dynamic_section_data?: NextTrainingSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const NextTrainingSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: NextTrainingSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData = {
    ...section.section_data,
    ...dynamic_section_data,
  } as NextTrainingSectionData

  return <NextTraining section={section} sectionData={sectionData} />
}
