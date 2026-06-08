import { useMemo, useState } from 'react'
import { ComboBox } from '@spacedock/falcon-ui'
import type { ChartSection as ChartSectionType } from '@domain/configs'
import type { ChartData } from './types'
import { ChartWrapper } from './ChartWrapper'

export interface CourseCompletionsChartPresentationProps {
  section?: ChartSectionType
  sectionData: ChartSectionType['section_data']
  chartData: ChartData[]
  isLoading?: boolean
}

export const CourseCompletionsChartPresentation = ({
  section,
  sectionData,
  chartData,
  isLoading = false,
}: CourseCompletionsChartPresentationProps) => {
  const [groupBy, updateGroupBy] = useState(sectionData.groupBy ?? 'category')

  const xAxisKey = useMemo(() => {
    return sectionData.xAxisKey ?? 'name'
  }, [sectionData.xAxisKey])

  const yAxisKeys = useMemo(() => {
    return sectionData.yAxisKeys ?? ['completed', 'inProgress', 'notStarted']
  }, [sectionData.yAxisKeys])

  const colors = useMemo(() => {
    return (
      sectionData.colors ?? {
        completed: '#22c55e',
        inProgress: '#f59e0b',
        notStarted: '#6b7280',
      }
    )
  }, [sectionData.colors])

  return (
    <>
      <div className="mb-4 flex justify-between">
        <ComboBox
          value={groupBy}
          onChange={(value) => updateGroupBy(value as 'category' | 'course')}
          items={[
            { value: 'category', item: 'By Category' },
            { value: 'course', item: 'By Course' },
          ]}
        />
      </div>
      <ChartWrapper
        data={chartData}
        xAxisKey={xAxisKey}
        yAxisKeys={yAxisKeys}
        colors={colors}
        isLoading={isLoading}
        title={section?.metadata?.display_name ?? 'Course Completions'}
        height={sectionData.height ?? section?.dynamic_section_data?.height}
      />
    </>
  )
}
