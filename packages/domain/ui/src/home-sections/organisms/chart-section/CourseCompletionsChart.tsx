import { useMemo, useState } from 'react'
import { keyBy } from 'lodash'
import type { HomeSection } from '@domain/configs'

import { useDynamicSummaryReport } from '../../hooks/useDynamicSummaryReport'
import { ChartWrapper } from './ChartWrapper'
import type { ChartSectionData, ChartData } from './types'
import { ComboBox } from '@spacedock/falcon-ui'

export const CourseCompletionsChart = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ChartSectionData>
  sectionData: ChartSectionData
  dynamic_section_data?: Partial<ChartSectionData>
}) => {
  const [groupBy, updateGroupBy] = useState(sectionData.groupBy ?? 'category')

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

    // Transform curriculum data into chart format
    const categoryMap = new Map<
      string,
      { completed: number; inProgress: number; total: number }
    >()

    const categoriesByID = keyBy(query.categories ?? [], 'catalogItemID')

    query.data.results.curriculum.forEach((curriculum) => {
      // For now, we'll group by curriculum name or use a generic category
      // In a real implementation, you might want to group by actual categories
      let categoryName = curriculum.name || 'Unknown'

      if (
        groupBy === 'category' &&
        query.curriculumIDsCategoryMap[curriculum.curriculumID] &&
        categoriesByID[query.curriculumIDsCategoryMap[curriculum.curriculumID]]
      ) {
        categoryName =
          categoriesByID[
            query.curriculumIDsCategoryMap[curriculum.curriculumID]
          ].name
      }

      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, { completed: 0, inProgress: 0, total: 0 })
      }

      const category = categoryMap.get(categoryName)!

      curriculum.statusSummary.forEach((status) => {
        category.total += status.participantCount

        if (status.completeStatus === 'ocCOMPLETE') {
          category.completed += status.participantCount
        } else if (status.completeStatus === 'ocINCOMPLETE') {
          category.inProgress += status.participantCount
        }
      })
    })

    // Convert to chart data format
    return Array.from(categoryMap.entries()).map(([name, data]) => ({
      name: name.length > 20 ? `${name.substring(0, 17)}...` : name,
      completed: data.completed,
      inProgress: data.inProgress,
    }))
  }, [
    groupBy ?? null,
    query.categories ?? null,
    query.curriculumIDsCategoryMap ?? null,
    query.data?.results?.curriculum,
  ])

  return (
    <ChartWrapper
      data={chartData}
      isLoading={query.isLoading}
      title={section?.metadata?.display_name ?? 'Learning Series Categories'}
      subtitle="Training Category"
      chartType={sectionData.chartType || 'bar'}
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
            { item: 'Category', value: 'category' },
            { item: 'Course', value: 'course' },
          ]}
          value={groupBy}
          onChange={(value) => updateGroupBy(value as 'category' | 'course')}
        />
      }
    />
  )
}
