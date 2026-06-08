import { useMemo } from 'react'
import { StatsCount } from '../../../business-academy/molecules/stats-count/StatsCount'
import type { HomeSection } from '@domain/configs'
import { Icon } from '@falcon/icons'

// Note: This import will need to be resolved - the hook is still in the home app
import { useDynamicSummaryReport } from '../../hooks/useDynamicSummaryReport'
import { useCurrentUser } from '@spacedock/chaincode'

import type { StatsCountSectionData } from './types.ts'

const EMPTY_NUMBER_ARRAY: number[] = []

export const CourseCompletions = ({
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
  const currentUser = useCurrentUser()

  // 3-level priority: URL → config teamID → user's primary team
  const effectiveTeamID =
    dynamic_section_data?.teamID ?? // Priority 1: from URL/page (Analytics Dashboard)
    sectionData.teamID ?? // Priority 2: from config (specific team chosen in builder)
    currentUser?.teamRootID // Priority 3: user's own primary team

  // TODO: This hook needs to be moved to a shared location or abstracted
  const query = useDynamicSummaryReport({
    domainIDFilters: isPreview ? [] : sectionData.domainIDFilters,
    teamIDFilters: isPreview ? [] : sectionData.teamIDFilters,
    categoryNameMatch: sectionData.categoryNameMatch,
    categoryNameNotMatch: sectionData.categoryNameNotMatch,
    reportTeamID: isPreview ? 0 : (effectiveTeamID ?? 0),
    memberID: dynamic_section_data?.memberID,
  })

  // Temporary placeholder while we resolve the hook dependency
  // const query = { isLoading: false, data: { results: { graphs: [] } } }

  const { count, currentlyInProgress, diffPercentage, prevCount } =
    useCourseCompletions(query, {
      graphTarget: 'Curriculum Completed',
      daysCount: dynamic_section_data?.daysCount,
    })

  // Use mock data in preview mode
  if (isPreview) {
    return (
      <StatsCount
        className="h-full"
        isLoading={false}
        value={23}
        title={section?.metadata?.display_name ?? 'Course Completions'}
        subtitle="12 currently in progress"
        change={{
          value: '+15%',
          period: 'vs Previous 30 days',
          trend: 'positive',
        }}
        icon={
          <Icon
            className="text-2xl"
            icon={sectionData.icon_name ?? 'trophy-outline'}
            color="current"
          />
        }
        iconColorScheme={sectionData.iconColorScheme}
      />
    )
  }

  return (
    <StatsCount
      className="h-full"
      isLoading={query.isLoading}
      value={count}
      title={section?.metadata?.display_name ?? 'Course Completions'}
      subtitle={`${currentlyInProgress} currently in progress`}
      change={
        !prevCount
          ? undefined
          : {
              value: `${diffPercentage}%`,
              period: `vs Previous ${dynamic_section_data?.daysCount ?? 30} days`,
              trend: diffPercentage < 0 ? 'negative' : 'positive',
            }
      }
      icon={
        <Icon
          className="text-2xl"
          icon={sectionData.icon_name ?? 'trophy-outline'}
          color="current"
        />
      }
      iconColorScheme={sectionData.iconColorScheme}
    />
  )
}

function typeNarrower(
  section: HomeSection,
): section is HomeSection<StatsCountSectionData> {
  return section.section_type === 'stats-count'
}

export function createDateFilterObject({
  daysCount = 30,
  startDate,
}: {
  daysCount?: number
  startDate?: string | Date
}) {
  if (!startDate) {
    const fallbackDate = new Date()
    fallbackDate.setDate(fallbackDate.getDate() - daysCount)

    startDate = fallbackDate.toISOString()
  }

  const date = new Date(startDate)

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    date,
  }
}

export function createDatePointObject({ date }: { date: string | Date }) {
  const filterData = createDateFilterObject({
    startDate: date,
  })

  return {
    yr: filterData.year,
    mth: filterData.month,
    dy: filterData.day,
    x: 0,
  }
}

export function useCourseCompletions(
  query: any, // TODO: Type this properly when we resolve the hook dependency
  props: {
    graphTarget:
      | 'Curriculum Added'
      | 'Curriculum Subtasks Completed'
      | 'Curriculum Completed'
    daysCount?: number
    startDate?: string
  },
) {
  const courseCompletions = useMemo(() => {
    const graphs = query.data?.results?.graphs
    const inProgressCount = query.data?.results?.curriculum?.reduce(
      (acc: number, curr: any) => {
        curr.statusSummary?.forEach?.((summary: any) => {
          if (summary.completeStatus !== 'ocINCOMPLETE') return

          acc += summary.participantCount
        })

        return acc
      },
      0,
    )

    if (!graphs) {
      return {
        currentlyInProgress: inProgressCount ?? 0,
        count: 0,
        prevCount: 0,
        diffDecimal: 0,
        diffPercentage: 0,
      }
    }

    const data = graphs.find((graph: any) => graph.label === props.graphTarget)

    if (!data || !data.points?.length) {
      return {
        currentlyInProgress: inProgressCount ?? 0,
        count: 0,
        prevCount: 0,
        diffDecimal: 0,
        diffPercentage: 0,
      }
    }

    const dateFilter = createDateFilterObject({
      daysCount: props.daysCount,
      startDate: props.startDate,
    })

    const prevDate = new Date(dateFilter.date)
    prevDate.setDate(prevDate.getDate() - (props.daysCount ?? 30))
    const prevDateFilter = createDateFilterObject({
      daysCount: props.daysCount,
      startDate: prevDate.toISOString(),
    })
    let count = 0
    let prevCount = 0

    data.points.forEach((point: any) => {
      if (!isBeforeDateFilter({ point, dateFilter })) {
        count += point.x
      } else if (!isBeforeDateFilter({ point, dateFilter: prevDateFilter })) {
        prevCount += point.x
      }
    })

    // * Calculate the percentage change from the previous period to the current period, as a decimal between 0 and 1
    let countDelta = (prevCount - count) / prevCount

    if (countDelta !== 0) {
      countDelta = countDelta * -1
    }

    return {
      currentlyInProgress: inProgressCount ?? 0,
      count,
      prevCount,
      diffDecimal: countDelta,
      diffPercentage: Math.floor(countDelta * 100),
    }
  }, [query.data ?? null, props.graphTarget, props.daysCount, props.startDate])

  return courseCompletions
}

export function isBeforeDateFilter({
  point,
  dateFilter,
}: {
  point: { yr: number; mth: number; dy: number; x: number }
  dateFilter: ReturnType<typeof createDateFilterObject>
}) {
  if (point.yr < dateFilter.year) {
    return true
  } else if (point.yr === dateFilter.year) {
    if (point.mth < dateFilter.month) {
      return true
    } else if (point.mth === dateFilter.month && point.dy < dateFilter.day) {
      return true
    }
  }

  return false
}
