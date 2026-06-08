import { useCurriculumSummaryReportQuery } from '@tyto/query'

import type { Props as MatchingCourseIDsFromCatalogProps } from './useMatchingCourseIDsFromCatalog'
import { useMatchingCourseIDsFromCatalog } from './useMatchingCourseIDsFromCatalog'

interface Props extends MatchingCourseIDsFromCatalogProps {
  reportTeamID: number
  memberID?: number
}

export function useDynamicSummaryReport(props: Props) {
  const {
    curriculumIDs,
    categories,
    curriculumIDsCategoryMap,
    isPending,
    isLoading,
    isError,
    error,
  } = useMatchingCourseIDsFromCatalog(props)

  const query = useCurriculumSummaryReportQuery({
    curriculumIDs: curriculumIDs,
    teamPath: props.reportTeamID ? `%,${props.reportTeamID || ''},%` : '',
    disabled:
      (!props.reportTeamID && !props.memberID) ||
      !curriculumIDs.length ||
      isPending,
    memberIDs: props.memberID ? `${props.memberID}` : undefined,
  })

  return {
    isPending: isPending || query.isLoading,
    isLoading: isLoading || query.isLoading,
    data: query.data,
    categories,
    curriculumIDsCategoryMap,
    isError: isError || query.isError,
    error: error || query.error,
    refetch: query.refetch,
  }
}
