import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import { zDashboardFilters, zIconConfig } from '../fragments'

// Default column span for stats-count sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Base schema for stats-count
const baseStatsCountData = z.object({
  sub_type: z.enum([
    'active-employees',
    'courses-completed',
    'lesson-completions',
  ]),
})

// Active employees schema
const activeEmployeesSchema = baseStatsCountData.extend({
  sub_type: z.literal('active-employees'),
  ...zDashboardFilters.shape,
  ...zIconConfig.shape,
})

// Courses completed schema
const coursesCompletedSchema = baseStatsCountData.extend({
  sub_type: z.literal('courses-completed'),
  lessonTypeFilters: z.array(z.string()).optional(),
  ...zDashboardFilters.shape,
  ...zIconConfig.shape,
})

// Lesson completions schema
const lessonCompletionsSchema = baseStatsCountData.extend({
  sub_type: z.literal('lesson-completions'),
  lessonTypeFilters: z.array(z.string()).optional(),
  ...zDashboardFilters.shape,
  ...zIconConfig.shape,
})

// Export schemas
export {
  activeEmployeesSchema,
  coursesCompletedSchema,
  lessonCompletionsSchema,
}

// Type inference (automatic TypeScript types!)
export type ActiveEmployeesData = z.infer<typeof activeEmployeesSchema>
export type CoursesCompletedData = z.infer<typeof coursesCompletedSchema>
export type LessonCompletionsData = z.infer<typeof lessonCompletionsSchema>

// Union type for all stats count data
export type StatsCountSectionData =
  | ActiveEmployeesData
  | CoursesCompletedData
  | LessonCompletionsData

// Section schema definition
export const statsCountSchema: SectionSchemaDefinition = {
  section_type: 'stats-count',
  label: 'Stats Count',
  description: 'Display statistical counts with icons',
  metadata_fields: ['display_name', 'bgColor'],
  sub_types: {
    'active-employees': {
      label: 'Active Employees',
      description: 'Show count of active employees',
      section_data_schema: activeEmployeesSchema,
    },
    'courses-completed': {
      label: 'Courses Completed',
      description: 'Show count of completed courses',
      section_data_schema: coursesCompletedSchema,
    },
    'lesson-completions': {
      label: 'Lesson Completions',
      description: 'Show count of completed lessons',
      section_data_schema: lessonCompletionsSchema,
    },
  },
}
