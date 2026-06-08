import { useMemo } from 'react'
import { sortBy } from 'lodash'
import { useTytoClient } from '@tyto/client'
import { useQuery } from '@tyto/query'

import type { Props as MatchingCourseIDsFromCatalogProps } from './useMatchingCourseIDsFromCatalog'
import { useMatchingCourseIDsFromCatalog } from './useMatchingCourseIDsFromCatalog'

interface Props extends MatchingCourseIDsFromCatalogProps {
  teamPath?: string
  beginDateEnrolled?: string
  memberIDs?: string
  disabled?: boolean
  reportTeamID?: number
}

export const useExpandCoursesReports = (props: Props) => {
  const tytoClient = useTytoClient()

  const { curriculumIDs: curriculumIDsFromCatalog } =
    useMatchingCourseIDsFromCatalog(props)

  const curriculumIDs = useMemo(() => {
    return sortBy(curriculumIDsFromCatalog)
  }, [curriculumIDsFromCatalog])

  const teamPath = props.teamPath
    ? props.teamPath
    : props.reportTeamID
      ? `%,${props.reportTeamID || ''},%`
      : undefined

  return useQuery({
    queryKey: [
      'expand-courses-reports',
      {
        curriculumIDs,
        teamPath,
        beginDateEnrolled: props.beginDateEnrolled,
        memberIDs: props.memberIDs,
      },
    ],
    queryFn: async () => {
      const requests = curriculumIDs.map((curriculumID) =>
        tytoClient.CurriculumSubcomponentSummaryReport.get({
          curriculumID,
          teamPath,
          beginDateEnrolled: props.beginDateEnrolled,
          memberIDs: props.memberIDs,
        }),
      )

      const responses = await Promise.all(requests)

      return responses.map((response) => response.results)
    },
    enabled: !props.disabled && !!curriculumIDs.length,
  })
}
