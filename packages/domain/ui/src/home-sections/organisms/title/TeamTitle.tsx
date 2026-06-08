import { SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { HomeSection } from '@domain/configs'
import type { TeamTitleData } from '@domain/schemas'

export interface TeamTitleProps {
  section?: HomeSection<TeamTitleData>
  sectionData: TeamTitleData
  teamName?: string
  isLoading?: boolean
}

export const TeamTitle = ({
  section,
  sectionData,
  teamName,
  isLoading = false,
}: TeamTitleProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
      padding={section.metadata.padding}
    >
      {isLoading && <SkeletonText size={'3xl'} length={'medium'} />}
      {!isLoading && (
        <div className="flex items-center gap-4">
          <TextHeading size={2} color="inherit" uppercase={false}>
            {sectionData.title || section.metadata.display_name || ''}
          </TextHeading>
          <TextHeading size={3} uppercase={false} color={'pink100/60'}>
            {teamName}
          </TextHeading>
        </div>
      )}
    </HomeSectionWrapper>
  )
}
