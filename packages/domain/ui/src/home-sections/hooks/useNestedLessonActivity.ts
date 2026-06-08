import { useMemo } from 'react'
import { sortBy } from 'lodash'
import { useTrainingCatalogLessonCompletionSummarySB2165Query } from '@tyto/query'

import type { Props as MatchingCourseIDsFromCatalogProps } from './useMatchingCourseIDsFromCatalog'
import { useMatchingCourseIDsFromCatalog } from './useMatchingCourseIDsFromCatalog'

interface Props extends MatchingCourseIDsFromCatalogProps {
  teamPath?: string
  beginDateEnrolled?: string
  memberIDs?: string
  disabled?: boolean
  reportTeamID?: number
}

export const useNestedLessonActivity = (props: Props) => {
  const { categories } = useMatchingCourseIDsFromCatalog(props)

  const curriculumIDs = useMemo(() => {
    return sortBy(categories.map((cat) => cat.catalogItemID))
  }, [categories])

  const categoryID = curriculumIDs[0] ?? 0
  const teamID = props.reportTeamID || 0

  return useTrainingCatalogLessonCompletionSummarySB2165Query({
    teamID,
    catalogID: categoryID,
    isCascade: true,
    afterDate: props.beginDateEnrolled,
    disabled: props.disabled || !categoryID || !teamID,
  })
}
