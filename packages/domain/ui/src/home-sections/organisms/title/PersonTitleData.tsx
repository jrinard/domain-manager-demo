import type { HomeSection } from '@domain/configs'
import type { PersonTitleData } from '@domain/schemas'
import { usePersonQuery } from '@tyto/query'
import { PersonTitle } from './PersonTitle'

export interface PersonTitleDataProps {
  section?: HomeSection<PersonTitleData>
  sectionData: PersonTitleData
  dynamic_section_data?: Partial<PersonTitleData>
}

export const PersonTitleDataComponent = ({
  section,
  sectionData,
  dynamic_section_data,
}: PersonTitleDataProps) => {
  const userID = dynamic_section_data?.memberID ?? sectionData.memberID ?? 0

  const personQuery = usePersonQuery({
    params: { personID: userID },
    enabled: !!userID,
  })

  return (
    <PersonTitle
      section={section}
      sectionData={sectionData}
      personID={personQuery.data?.person?.personID}
      givenName={personQuery.data?.person?.givenName}
      familyName={personQuery.data?.person?.familyName}
      jobTitle={personQuery.data?.person?.jobTitle}
      company={personQuery.data?.person?.company}
      isLoading={personQuery.isPending}
    />
  )
}
