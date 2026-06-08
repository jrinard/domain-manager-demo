import { BAR3Quadrants } from '../../../business-academy/organisms/ba-r3-quadrants/BAR3Quadrants'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type { HomeSection } from '@domain/configs'
import type { R3QuadrantsSectionData } from '@domain/schemas'
import type { DiscProfile } from '@tyto/client'

export interface R3QuadrantsProps {
  section?: HomeSection<R3QuadrantsSectionData>
  sectionData: R3QuadrantsSectionData
  discProfile?: DiscProfile
  isLoading?: boolean
}

export const R3Quadrants = ({
  section,
  discProfile,
  isLoading = false,
}: R3QuadrantsProps) => {
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
      <BAR3Quadrants
        discProfile={discProfile}
        isLoading={isLoading}
        isPreviewMode={false}
      />
    </HomeSectionWrapper>
  )
}
