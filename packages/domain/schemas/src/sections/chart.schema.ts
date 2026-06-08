import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for chart sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 6 as const

// Base chart configuration
const baseChartConfig = z.object({
  chartType: z.enum(['bar', 'bar-stacked', 'line', 'area', 'pie']).optional(),
  lineType: z
    .enum(['basis', 'basisClosed', 'linear', 'monotone', 'natural', 'step'])
    .optional(),
  lineDot: z.boolean().optional(),
  lessonTypeFilters: z
    .array(z.enum(['ocVIDEO', 'ocEXAM', 'ocDOCUMENT', 'ocSCORM', 'ocURL']))
    .optional(),
  groupBy: z.enum(['category', 'course']).optional(),
  granularity: z.enum(['auto', 'week', 'month']).optional(),
  showLegend: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  showGrid: z.boolean().optional(),
  xAxisKey: z.string().optional(),
  yAxisKeys: z.array(z.string()).optional(),
  // In Zod v4, z.record requires key and value schemas, or just value with string keys
  colors: z.record(z.string(), z.string()).optional(),
  height: z.number().optional(),
})

const trainingRelatedConfigSchema = z.object({
  domainIDFilters: z.array(z.number().int().positive()).optional(),
  teamIDFilters: z.array(z.number().int().positive()).optional(),
  categoryNameMatch: z.string().optional(),
  categoryNameNotMatch: z.string().optional(),
  daysCount: z.number().int().positive().default(30),
})

const trainingBaseConfig = baseChartConfig.extend({
  domainIDFilters: z.array(z.number().int().positive()).optional(),
  teamIDFilters: z.array(z.number().int().positive()).optional(),
  categoryNameMatch: z.string().optional(),
  categoryNameNotMatch: z.string().optional(),
  daysCount: z.number().int().positive().default(30),
})

// Course completions chart schema
const courseCompletionsChartSchema = trainingBaseConfig.extend({
  sub_type: z.literal('course-completions'),
})
// .extend(trainingRelatedConfigSchema)

// Videos watched chart schema
const videosWatchedChartSchema = trainingBaseConfig.extend({
  sub_type: z.literal('videos-watched'),
})
// .extend(trainingRelatedConfigSchema)

// Course activity chart schema
const courseActivityChartSchema = trainingBaseConfig.extend({
  sub_type: z.literal('course-activity'),
})
// .extend(trainingRelatedConfigSchema)

// Steps completions chart schema
const stepsCompletionsChartSchema = trainingBaseConfig.extend({
  sub_type: z.literal('steps-completions'),
})
// .extend(trainingRelatedConfigSchema)

// Export schemas
export {
  courseCompletionsChartSchema,
  videosWatchedChartSchema,
  courseActivityChartSchema,
  stepsCompletionsChartSchema,
}

// Type inference
export type CourseCompletionsChartData = z.infer<
  typeof courseCompletionsChartSchema
>
export type VideosWatchedChartData = z.infer<typeof videosWatchedChartSchema>
export type CourseActivityChartData = z.infer<typeof courseActivityChartSchema>
export type StepsCompletionsChartData = z.infer<
  typeof stepsCompletionsChartSchema
>

// Union type
export type ChartSectionData =
  | CourseCompletionsChartData
  | VideosWatchedChartData
  | CourseActivityChartData
  | StepsCompletionsChartData

// Section schema definition
export const chartSchema: SectionSchemaDefinition = {
  section_type: 'chart',
  label: 'Chart',
  description: 'Display data visualizations',
  metadata_fields: ['display_name', 'bgColor'],
  sub_types: {
    'course-completions': {
      label: 'Course Completions Chart',
      section_data_schema: courseCompletionsChartSchema,
    },
    'videos-watched': {
      label: 'Videos Watched Chart',
      section_data_schema: videosWatchedChartSchema,
    },
    'course-activity': {
      label: 'Course Activity Chart',
      section_data_schema: courseActivityChartSchema,
    },
    'steps-completions': {
      label: 'Steps Completions Chart',
      section_data_schema: stepsCompletionsChartSchema,
    },
  },
}
