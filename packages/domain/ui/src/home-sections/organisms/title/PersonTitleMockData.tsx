import type { HomeSection } from '@domain/configs'
import type { PersonTitleData } from '@domain/schemas'
import { PersonTitle } from './PersonTitle'

export interface PersonTitleMockDataProps {
  section?: HomeSection<PersonTitleData>
  sectionData: PersonTitleData
}

export const PersonTitleMockData = ({
  section,
  sectionData,
}: PersonTitleMockDataProps) => {
  return (
    <PersonTitle
      section={section}
      sectionData={sectionData}
      personID={2}
      givenName="Clark"
      familyName="Kent"
      jobTitle="Reporter"
      company="Daily Planet"
      isLoading={false}
    />
  )
}
