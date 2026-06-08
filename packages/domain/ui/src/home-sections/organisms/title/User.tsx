import { Avatar, SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import type { HomeSection } from '@domain/configs'
import { usePersonQuery } from '@tyto/query'
import { makePathFullyQualified } from '@tyto/assets'
import { SessionHandling } from '@spacedock/cargo-bay'
import { getTopOrigin } from '@spacedock/origins'
import { EnvironmentVariables } from '@spacedock/tricorder'

import { HomeSectionWrapper } from '../home-section-wrapper/'

export type UserSectionData = {
  title: string
  teamID: number
}

export const UserSection = ({
  section,
  userID,
  isPreviewMode = false,
}: {
  section: HomeSection
  userID: number
  isPreviewMode?: boolean
}) => {
  const personQuery = usePersonQuery({
    params: { personID: userID ?? 0 },
    enabled: !!userID && !isPreviewMode,
  })

  const mockPerson = isPreviewMode
    ? {
        personID: 2,
        givenName: 'Clark',
        familyName: 'Kent',
        jobTitle: 'Reporter',
        company: 'Daily Planet',
      }
    : undefined

  if (!typeNarrower(section)) {
    return null
  }

  return (
    <HomeSectionWrapper<UserSectionData>
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
      padding={isPreviewMode ? 'sm' : undefined}
    >
      {personQuery.isPending && !isPreviewMode && (
        <SkeletonText size={'3xl'} length={'medium'} />
      )}
      {(!personQuery.isPending || isPreviewMode) && (
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center justify-center">
            <Avatar
              stroked
              className="mr-2"
              size="3xl"
              name={`${isPreviewMode ? mockPerson?.givenName : personQuery.data?.person?.givenName} ${isPreviewMode ? mockPerson?.familyName : personQuery.data?.person?.familyName}`}
              src={
                isPreviewMode
                  ? undefined
                  : makePathFullyQualified({
                      baseURL:
                        EnvironmentVariables.TYTO_BASE_URL ||
                        getTopOrigin() ||
                        '/',
                      relativePath: `/person/profilephoto?sessionKey=${SessionHandling.getActiveSessionKey()}&personID=${personQuery.data?.person?.personID}&assetID=&encoding=ocORIGINAL&silhouette=dark`,
                    })
              }
            />
          </div>

          <div className="flex grow flex-col items-start">
            <TextHeading size={2} uppercase={false}>
              {isPreviewMode
                ? mockPerson?.givenName
                : personQuery.data?.person?.givenName}{' '}
              {isPreviewMode
                ? mockPerson?.familyName
                : personQuery.data?.person?.familyName}
            </TextHeading>
            <TextHeading
              className="font-normal"
              size={6}
              uppercase={false}
              color={'pink100/60'}
            >
              {isPreviewMode
                ? mockPerson?.jobTitle
                : personQuery.data?.person?.jobTitle}
              {(isPreviewMode
                ? mockPerson?.jobTitle
                : personQuery.data?.person?.jobTitle) &&
              (isPreviewMode
                ? mockPerson?.company
                : personQuery.data?.person?.company)
                ? ' • '
                : null}
              {isPreviewMode
                ? mockPerson?.company
                : personQuery.data?.person?.company}
            </TextHeading>
          </div>
        </div>
      )}
    </HomeSectionWrapper>
  )
}

function typeNarrower(
  section: HomeSection,
): section is HomeSection<UserSectionData> {
  return section.section_type === 'title'
}
