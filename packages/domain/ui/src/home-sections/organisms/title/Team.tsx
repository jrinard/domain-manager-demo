import { SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { HomeSection } from '@domain/configs'
import { useTeamQuery } from '@tyto/query'

export type TeamSectionData = {
  title: string
  teamID: number
}

export const TeamSection = ({
  section,
  teamID,
  isPreviewMode = false,
}: {
  section: HomeSection
  teamID: number
  isPreviewMode?: boolean
}) => {
  const teamQuery = useTeamQuery({
    teamID: teamID ?? 0,
    isEnabled: !!teamID && !isPreviewMode,
  })

  const mockTeam = isPreviewMode
    ? {
        team: {
          teamName: 'Preview Team',
        },
      }
    : undefined

  if (!typeNarrower(section)) {
    return null
  }

  return (
    <HomeSectionWrapper<TeamSectionData>
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
      padding={isPreviewMode ? 'sm' : undefined}
    >
      {teamQuery.isPending && !isPreviewMode && (
        <SkeletonText size={'3xl'} length={'medium'} />
      )}
      {(!teamQuery.isPending || isPreviewMode) && (
        <div className="flex items-center gap-4">
          <TextHeading size={2} uppercase={false}>
            {section.section_data.title ?? section.metadata.display_name ?? ''}
          </TextHeading>
          <TextHeading size={3} uppercase={false} color={'pink100/60'}>
            {isPreviewMode
              ? mockTeam?.team.teamName
              : teamQuery.data?.team.teamName}
          </TextHeading>
        </div>
      )}
    </HomeSectionWrapper>
  )
}

function typeNarrower(
  section: HomeSection,
): section is HomeSection<TeamSectionData> {
  return section.section_type === 'title'
}
