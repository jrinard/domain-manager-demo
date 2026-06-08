import type { HomeSection } from '@domain/configs'
import type { TeamTitleData } from '@domain/schemas'
import { TeamTitle } from './TeamTitle'

export interface TeamTitleMockDataProps {
  section?: HomeSection<TeamTitleData, 'title'>
  sectionData: TeamTitleData
}

export const TeamTitleMockData = ({
  section,
  sectionData,
}: TeamTitleMockDataProps) => {
  return (
    <TeamTitle
      section={section}
      sectionData={sectionData}
      teamName="Preview Team"
      isLoading={false}
    />
  )
}
