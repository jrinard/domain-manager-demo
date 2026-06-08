import { BAR3 } from '../../../business-academy/organisms/ba-r3/BAR3'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { HomeSection } from '@domain/configs'
import type { R3HeatmapSectionData } from '@domain/schemas'
import type { DiscProfile } from '@tyto/client'

export interface R3HeatmapProps {
  section?: HomeSection<R3HeatmapSectionData>
  sectionData: R3HeatmapSectionData
  discProfiles?: DiscProfile[]
  teamName?: string
  isLoading?: boolean
}

export const R3Heatmap = ({
  section,
  discProfiles = [],
  teamName = '',
  isLoading = false,
}: R3HeatmapProps) => {
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
      <BAR3
        discProfiles={discProfiles}
        isLoading={isLoading}
        teamName={teamName}
        isPreview={false}
      />
    </HomeSectionWrapper>
  )
}
