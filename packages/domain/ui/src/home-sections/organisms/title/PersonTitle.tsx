import { Avatar, SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import type { HomeSection } from '@domain/configs'
import { makePathFullyQualified } from '@tyto/assets'
import { SessionHandling } from '@spacedock/cargo-bay'
import { getTopOrigin } from '@spacedock/origins'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { PersonTitleData } from '@domain/schemas'

export interface PersonTitleProps {
  section?: HomeSection<PersonTitleData>
  sectionData: PersonTitleData
  personID?: number
  givenName?: string
  familyName?: string
  jobTitle?: string
  company?: string
  isLoading?: boolean
}

export const PersonTitle = ({
  section,
  personID,
  givenName,
  familyName,
  jobTitle,
  company,
  isLoading = false,
}: PersonTitleProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
    >
      {isLoading && <SkeletonText size={'3xl'} length={'medium'} />}
      {!isLoading && (
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center justify-center">
            <Avatar
              stroked
              className="mr-2"
              size="3xl"
              name={`${givenName} ${familyName}`}
              src={
                personID
                  ? makePathFullyQualified({
                      baseURL:
                        EnvironmentVariables.TYTO_BASE_URL ||
                        getTopOrigin() ||
                        '/',
                      relativePath: `/person/profilephoto?sessionKey=${SessionHandling.getActiveSessionKey()}&personID=${personID}&assetID=&encoding=ocORIGINAL&silhouette=dark`,
                    })
                  : undefined
              }
            />
          </div>

          <div className="flex grow flex-col items-start">
            <TextHeading size={2} uppercase={false}>
              {givenName} {familyName}
            </TextHeading>
            <TextHeading
              className="font-normal"
              size={6}
              uppercase={false}
              color={'pink100/60'}
            >
              {jobTitle}
              {jobTitle && company ? ' • ' : null}
              {company}
            </TextHeading>
          </div>
        </div>
      )}
    </HomeSectionWrapper>
  )
}
