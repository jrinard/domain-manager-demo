import { BaLink } from '../../../business-academy/organisms/ba-link/BALink'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { HomeSection } from '@domain/configs'
import type { ReportingTrainingSectionData } from '@domain/schemas'

export interface ReportingTrainingProps {
  section?: HomeSection<ReportingTrainingSectionData>
  sectionData: ReportingTrainingSectionData
}

export const ReportingTraining = ({ section }: ReportingTrainingProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 3,
      }}
      padding={section.metadata.padding}
    >
      <BaLink title={section.metadata?.display_name || 'Reporting'} link="" />
    </HomeSectionWrapper>
  )
}
