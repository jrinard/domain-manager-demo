import type {
  SectionRenderMode,
  ReportingTrainingSection as ReportingTrainingSectionType,
} from '@domain/configs'
import { ReportingTraining } from './ReportingTraining'

export interface ReportingTrainingSectionProps {
  section: ReportingTrainingSectionType | null
  dynamic_section_data?: ReportingTrainingSectionType['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const ReportingTrainingSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: ReportingTrainingSectionProps) => {
  if (!section) {
    return null
  }

  // * Note, section_data is defined as an empty object for this section type
  // // const sectionData: ReportingTrainingSectionData = {
  // //   ...section.section_data,
  // //   ...dynamic_section_data,
  // // }

  return (
    <ReportingTraining section={section} sectionData={section.section_data} />
  )
}
