import type { HomeSection } from '@domain/configs'
import type { PrimaryTeamTitleData, TeamTitleData } from '@domain/schemas'
import { useSession } from '@spacedock/cargo-bay'
import { TeamTitleDataComponent } from './TeamTitleData'

export interface PrimaryTeamTitleDataProps {
  section?: HomeSection<TeamTitleData, 'title'>
  sectionData: PrimaryTeamTitleData
}

export const PrimaryTeamTitleDataComponent = ({
  section,
  sectionData,
}: PrimaryTeamTitleDataProps) => {
  const user = useSession()

  // Convert PrimaryTeamTitleData to TeamTitleData by injecting the user's team ID
  const teamSectionData: TeamTitleData = {
    ...sectionData,
    sub_type: 'team',
    memberID: user.teamRootID ?? 0,
  }

  return (
    <TeamTitleDataComponent section={section} sectionData={teamSectionData} />
  )
}
