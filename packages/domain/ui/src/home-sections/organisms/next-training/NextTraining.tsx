import { BaLink } from '../../../business-academy/organisms/ba-link/BALink'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { HomeSection } from '@domain/configs'
import type { NextTrainingSectionData } from '@domain/schemas'

export interface NextTrainingProps {
  section?: HomeSection<NextTrainingSectionData>
  sectionData: NextTrainingSectionData
}

export const NextTraining = ({ section }: NextTrainingProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 3,
      }}
      padding={section.metadata.padding ?? 'sm'}
    >
      <BaLink
        title={section.metadata?.display_name || 'Training'}
        link=""
        app="mastery"
      />
    </HomeSectionWrapper>
  )
}
