import { useMemo } from 'react'
import { StatsCount } from '../../../business-academy/molecules/stats-count/StatsCount'
import type { HomeSection } from '@domain/configs'
import { Icon } from '@falcon/icons'

// Note: This import will need to be resolved - the hook is still in the home app
// import { useDynamicSummaryReport } from '../../../../data/hooks/useDynamicSummaryReport'

import { useDateByDaysInPastCounts } from '../../hooks/useDateByDaysInPastCounts'
import { useNestedLessonActivity } from '../../hooks/useNestedLessonActivity'
import { useCurrentUser } from '@spacedock/chaincode'

import type { StatsCountSectionData } from './types.ts'

const EMPTY_OBJECT: Record<string, TypeSummaryCounts> = {}

interface TypeSummaryCounts {
  completed_count: number
  in_progress_count: number
  total_count: number
}

export const LessonsCompleted = ({
  section,
  sectionData,
  dynamic_section_data,
  isPreview = false,
}: {
  section?: HomeSection<StatsCountSectionData>
  sectionData: StatsCountSectionData
  dynamic_section_data?: Partial<StatsCountSectionData>
  isPreview?: boolean
}) => {
  const { dateInPastString } = useDateByDaysInPastCounts(
    dynamic_section_data?.daysCount ?? 30,
  )

  const currentUser = useCurrentUser()

  // 3-level priority: URL → config teamID → user's primary team
  const effectiveTeamID =
    dynamic_section_data?.teamID ?? // Priority 1: from URL/page (Analytics Dashboard)
    sectionData.teamID ?? // Priority 2: from config (specific team chosen in builder)
    currentUser?.teamRootID // Priority 3: user's own primary team

  const query = useNestedLessonActivity({
    domainIDFilters: (isPreview ? [] : sectionData.domainIDFilters) as
      | number[]
      | undefined,
    teamIDFilters: (isPreview ? [] : sectionData.teamIDFilters) as
      | number[]
      | undefined,
    categoryNameMatch: sectionData.categoryNameMatch as string | undefined,
    beginDateEnrolled: dateInPastString,
    categoryNameNotMatch: sectionData.categoryNameNotMatch as
      | string
      | undefined,
    reportTeamID: isPreview ? 0 : ((effectiveTeamID as number) ?? 0),
  })

  const chartData = useMemo((): Record<string, TypeSummaryCounts> => {
    if (!query.data) {
      return EMPTY_OBJECT
    }

    const lessonTypeFilters = new Set(sectionData.lessonTypeFilters ?? [])

    const activity_count_map: Record<string, TypeSummaryCounts> = {}

    query.data.TrainingCatalogLessonCompletionSummary_SB2165.forEach(
      (courseSubReport) => {
        courseSubReport.lessonTypeStatusSummary.forEach(
          (lessonActivitySummary) => {
            if (lessonActivitySummary.itemType !== 'ocVIDEO') {
              return
            } else if (
              lessonTypeFilters.size &&
              !lessonTypeFilters.has(lessonActivitySummary.itemType)
            ) {
              return
            }

            if (!activity_count_map[lessonActivitySummary.itemType]) {
              activity_count_map[lessonActivitySummary.itemType] = {
                completed_count: 0,
                in_progress_count: 0,
                total_count: 0,
              }
            }

            activity_count_map[
              lessonActivitySummary.itemType
            ].completed_count += lessonActivitySummary.count_ocCOMPLETE
            activity_count_map[
              lessonActivitySummary.itemType
            ].in_progress_count += lessonActivitySummary.count_ocINCOMPLETE

            activity_count_map[lessonActivitySummary.itemType].total_count +=
              lessonActivitySummary.count_ocCOMPLETE +
              lessonActivitySummary.count_ocINCOMPLETE
          },
        )
      },
    )

    // Convert to chart data format
    return activity_count_map
  }, [query.data?.TrainingCatalogLessonCompletionSummary_SB2165])

  // Use mock data in preview mode
  if (isPreview) {
    return (
      <StatsCount
        isLoading={false}
        className="h-full"
        value={156}
        title={section?.metadata?.display_name ?? 'Lessons Completed'}
        subtitle="24 with remaining playtime"
        icon={
          <Icon
            className="text-2xl"
            icon={sectionData.icon_name ?? 'videocam-outline'}
            color="current"
          />
        }
        iconColorScheme={sectionData.iconColorScheme}
      />
    )
  }

  return (
    <StatsCount
      isLoading={query.isLoading || !query.isFetched}
      className="h-full"
      value={chartData['ocVIDEO']?.completed_count || 0}
      title={section?.metadata?.display_name ?? 'Course Completions'}
      subtitle={`${chartData['ocVIDEO']?.in_progress_count || 0} with remaining playtime`}
      icon={
        <Icon
          className="text-2xl"
          icon={sectionData.icon_name ?? 'videocam-outline'}
          color="current"
        />
      }
      iconColorScheme={sectionData.iconColorScheme}
    />
  )
}
