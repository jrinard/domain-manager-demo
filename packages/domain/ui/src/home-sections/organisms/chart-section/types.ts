import type { RechartsPrimitive } from '@spacedock/falcon-ui'

export type ChartSectionSubType =
  | 'course-completions'
  | 'videos-watched'
  | 'course-activity'
  | 'steps-completions'

export interface ChartData {
  name: string
  // // completed: number
  // // inProgress: number
  [key: string]: string | number
}

export interface ChartSectionData extends Record<string, unknown> {
  sub_type: ChartSectionSubType
  // Generic chart configuration
  chartType?: 'bar' | 'bar-stacked' | 'line' | 'area' | 'pie'
  lineType?: RechartsPrimitive.LineProps['type']
  lineDot?: boolean
  lessonTypeFilters?: string[]
  groupBy?: 'category' | 'course'
  granularity?: 'auto' | 'week' | 'month'
  showLegend?: boolean
  showTooltip?: boolean
  showGrid?: boolean
  // Data configuration
  xAxisKey?: string
  yAxisKeys?: string[]
  // Styling
  colors?: Record<string, string>
  height?: number
  daysCount?: number
}
