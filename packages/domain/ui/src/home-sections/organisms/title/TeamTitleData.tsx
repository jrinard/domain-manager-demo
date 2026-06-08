import type { HomeSection } from '@domain/configs'
import type { TeamTitleData } from '@domain/schemas'
import { useTeamQuery } from '@tyto/query'
import { TeamTitle } from './TeamTitle'

export interface TeamTitleDataProps {
  section?: HomeSection<TeamTitleData, 'title'>
  sectionData: TeamTitleData
  dynamic_section_data?: Partial<TeamTitleData>
}

export const TeamTitleDataComponent = ({
  section,
  sectionData,
  dynamic_section_data,
}: TeamTitleDataProps) => {
  const teamID = dynamic_section_data?.memberID ?? sectionData.memberID ?? 0

  const teamQuery = useTeamQuery({
    teamID,
    isEnabled: !!teamID,
  })

  return (
    <TeamTitle
      section={section}
      sectionData={sectionData}
      teamName={teamQuery.data?.team.teamName}
      isLoading={!!teamID && teamQuery.isPending}
    />
  )
}
