import { useMemo, useState } from 'react'
import { ComboBox } from '@spacedock/falcon-ui'
import type { HomeSection } from '@domain/configs'

import { useDynamicSummaryReport } from '../../hooks/useDynamicSummaryReport'
import { ChartWrapper } from './ChartWrapper'
import type { ChartSectionData, ChartData } from './types'
import {
  createDateFilterObject,
  isBeforeDateFilter,
} from '../stats-count/CourseCompletions'

export const CourseActivityGraph = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ChartSectionData>
  sectionData: ChartSectionData
  dynamic_section_data?: Partial<ChartSectionData>
}) => {
  const [granularity, updateGranularity] = useState(
    sectionData.granularity ?? 'auto',
  )
  const query = useDynamicSummaryReport({
    domainIDFilters: sectionData.domainIDFilters as number[] | undefined,
    teamIDFilters: sectionData.teamIDFilters as number[] | undefined,
    categoryNameMatch: sectionData.categoryNameMatch as string | undefined,
    categoryNameNotMatch: sectionData.categoryNameNotMatch as
      | string
      | undefined,
    reportTeamID: (dynamic_section_data?.teamID as number) ?? 0,
  })

  const chartData = useMemo((): ChartData[] => {
    if (!query.data?.results?.curriculum) {
      return []
    }

    // Transform graph data into chart format
    const activityMap = new Map<
      string,
      { coursesCompleted: number; stepsCompleted: number }
    >()

    const dateFilter = createDateFilterObject({
      daysCount: sectionData.daysCount ?? 30,
    })

    query.data.results.graphs.forEach((graph) => {
      if (graph.label === 'Curriculum Completed') {
        graph.points.forEach((point) => {
          if (isBeforeDateFilter({ point, dateFilter: dateFilter })) return

          const date = new Date(`${point.mth}/${point.dy}/${point.yr}`)
          let key = date.toLocaleDateString()

          if (granularity === 'week') {
            key = getMondayOfWeek(date).toLocaleDateString()
          }

          if (!activityMap.get(key)) {
            activityMap.set(key, {
              coursesCompleted: 0,
              stepsCompleted: 0,
            })
          }

          const propertyRef = activityMap.get(key)

          if (propertyRef) {
            propertyRef.coursesCompleted += point.x
          }
        })
      } else if (graph.label === 'Curriculum Subtasks Completed') {
        graph.points.forEach((point) => {
          if (isBeforeDateFilter({ point, dateFilter: dateFilter })) return

          const date = new Date(`${point.mth}/${point.dy}/${point.yr}`)
          let key = date.toLocaleDateString()

          if (granularity === 'week') {
            key = getMondayOfWeek(date).toLocaleDateString()
          }

          if (!activityMap.get(key)) {
            activityMap.set(key, {
              coursesCompleted: 0,
              stepsCompleted: 0,
            })
          }

          const propertyRef = activityMap.get(key)

          if (propertyRef) {
            propertyRef.stepsCompleted += point.x
          }
        })
      }
    })

    // Convert to chart data format
    return Array.from(activityMap.entries()).map(([name, data]) => ({
      name: name.length > 20 ? `${name.substring(0, 17)}...` : name,
      coursesCompleted: data.coursesCompleted,
      stepsCompleted: data.stepsCompleted,
    }))
  }, [
    granularity ?? null,
    sectionData.daysCount ?? 30,
    query.data?.results?.curriculum,
  ])

  return (
    <ChartWrapper
      data={chartData}
      isLoading={query.isLoading}
      title={section?.metadata?.display_name ?? 'Learning Series Categories'}
      subtitle="Training Category"
      chartType={sectionData.chartType || 'bar'}
      lineType={sectionData.lineType}
      lineDot={sectionData.lineDot}
      showLegend={sectionData.showLegend ?? true}
      showTooltip={sectionData.showTooltip ?? true}
      showGrid={sectionData.showGrid ?? true}
      xAxisKey={sectionData.xAxisKey || 'name'}
      yAxisKeys={sectionData.yAxisKeys || ['completed', 'inProgress']}
      colors={sectionData.colors}
      height={sectionData.height}
      className="text-site-fg h-full overflow-hidden rounded-lg bg-transparent shadow-sm"
      titleRight={
        <ComboBox
          items={[
            { item: 'Day', value: 'auto' },
            { item: 'Week', value: 'week' },
          ]}
          value={granularity}
          onChange={(value) => updateGranularity(value as 'auto' | 'week')}
        />
      }
    />
  )
}

function getMondayOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // If Sunday, go back 6 days, otherwise go back (dayOfWeek - 1) days

  const monday = new Date(date)
  monday.setDate(date.getDate() - daysToSubtract)

  return monday
}
