import { useMemo } from 'react'
import type { HomeSection } from '@domain/configs'

import { useNestedLessonActivity } from '../../hooks/useNestedLessonActivity'
import { ChartWrapper } from './ChartWrapper'
import type { ChartSectionData, ChartData } from './types'
import { useDateByDaysInPastCounts } from '../../hooks/useDateByDaysInPastCounts'

export const StepsCompletionsChart = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ChartSectionData>
  sectionData: ChartSectionData
  dynamic_section_data?: Partial<ChartSectionData>
}) => {
  const { dateInPastString } = useDateByDaysInPastCounts(
    dynamic_section_data?.daysCount ?? 30,
  )

  const query = useNestedLessonActivity({
    domainIDFilters: sectionData.domainIDFilters as number[] | undefined,
    teamIDFilters: sectionData.teamIDFilters as number[] | undefined,
    categoryNameMatch: sectionData.categoryNameMatch as string | undefined,
    beginDateEnrolled: dateInPastString,
    categoryNameNotMatch: sectionData.categoryNameNotMatch as
      | string
      | undefined,
    reportTeamID: (dynamic_section_data?.teamID as number) ?? 0,
  })

  const chartData = useMemo((): ChartData[] => {
    if (!query.data) {
      return []
    }

    const lessonTypeFilters = new Set(sectionData.lessonTypeFilters ?? [])

    // Transform curriculum data into chart format
    const courseSubReportMap = new Map<
      string,
      { completed: number; inProgress: number; total: number }
    >()

    query.data.TrainingCatalogLessonCompletionSummary_SB2165.forEach(
      (courseSubReport) => {
        const courseSubReportName = courseSubReport.rootMainTitle || 'Unknown'

        if (!courseSubReportMap.has(courseSubReportName)) {
          courseSubReportMap.set(courseSubReportName, {
            completed: 0,
            inProgress: 0,
            total: 0,
          })
        }

        const courseSubReportMapData =
          courseSubReportMap.get(courseSubReportName)!

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

            // * Increment Total Count
            courseSubReportMapData.total +=
              lessonActivitySummary.count_ocCOMPLETE +
              lessonActivitySummary.count_ocINCOMPLETE +
              lessonActivitySummary.count_ocNOTSTARTED

            // * Increment Completed and In Progress Counts
            courseSubReportMapData.completed +=
              lessonActivitySummary.count_ocCOMPLETE
            courseSubReportMapData.inProgress +=
              lessonActivitySummary.count_ocINCOMPLETE
          },
        )
      },
    )

    // Convert to chart data format
    return Array.from(courseSubReportMap.entries()).map(([name, data]) => ({
      name: name.length > 20 ? `${name.substring(0, 17)}...` : name,
      completed: data.completed,
      inProgress: data.inProgress,
    }))
  }, [query.data?.TrainingCatalogLessonCompletionSummary_SB2165])

  return (
    <ChartWrapper
      data={chartData}
      isLoading={query.isLoading || !query.isFetched}
      title={section?.metadata?.display_name ?? 'Learning Series Categories'}
      subtitle="Videos by Course"
      chartType={sectionData.chartType || 'bar'}
      showLegend={sectionData.showLegend ?? true}
      showTooltip={sectionData.showTooltip ?? true}
      showGrid={sectionData.showGrid ?? true}
      xAxisKey={sectionData.xAxisKey || 'name'}
      yAxisKeys={sectionData.yAxisKeys || ['completed', 'inProgress']}
      colors={
        sectionData.colors ?? {
          completed: 'var(--chart-1)',
          inProgress: 'var(--chart-2)',
        }
      }
      height={sectionData.height}
      className="text-site-fg h-full overflow-hidden rounded-lg bg-transparent shadow-sm"
    />
  )
}
