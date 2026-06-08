import type { HomeSection } from '@domain/configs'
import type { PrimaryTeamTitleData } from '@domain/schemas'
import { TeamTitleMockData } from './TeamTitleMockData'

export interface PrimaryTeamTitleMockDataProps {
  section?: HomeSection<PrimaryTeamTitleData>
  sectionData: PrimaryTeamTitleData
}

export const PrimaryTeamTitleMockData = ({
  section,
  sectionData,
}: PrimaryTeamTitleMockDataProps) => {
  // PrimaryTeam just uses the TeamTitle mock data
  return (
    <TeamTitleMockData
      section={section as any}
      sectionData={{ ...sectionData, sub_type: 'team', memberID: 1 }}
    />
  )
}
