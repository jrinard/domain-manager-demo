import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import { zDashboardFilters } from '../fragments'

// Default column span for activity-table sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 6 as const

// Base schema
const baseActivityTableData = z.object({
  sub_type: z.enum([
    'category-training-progress',
    'course-completion-activity',
    'learning-activity',
    'training-progress',
    'catalog-lesson-activity',
  ]),
})

// Category training progress schema
const categoryTrainingProgressSchema = baseActivityTableData.extend({
  sub_type: z.literal('category-training-progress'),
  ...zDashboardFilters.shape,
})

// Course completion activity schema
const courseCompletionActivitySchema = baseActivityTableData.extend({
  sub_type: z.literal('course-completion-activity'),
  ...zDashboardFilters.shape,
})

// Learning activity schema
const learningActivitySchema = baseActivityTableData.extend({
  sub_type: z.literal('learning-activity'),
  ...zDashboardFilters.shape,
})

// Training progress schema
const trainingProgressSchema = baseActivityTableData.extend({
  sub_type: z.literal('training-progress'),
  ...zDashboardFilters.shape,
})

// Catalog lesson activity schema
const catalogLessonActivitySchema = baseActivityTableData.extend({
  sub_type: z.literal('catalog-lesson-activity'),
  ...zDashboardFilters.shape,
})

// Export schemas
export {
  categoryTrainingProgressSchema,
  courseCompletionActivitySchema,
  learningActivitySchema,
  trainingProgressSchema,
  catalogLessonActivitySchema,
}

// Type inference
export type CategoryTrainingProgressData = z.infer<
  typeof categoryTrainingProgressSchema
>
export type CourseCompletionActivityData = z.infer<
  typeof courseCompletionActivitySchema
>
export type LearningActivityData = z.infer<typeof learningActivitySchema>
export type TrainingProgressData = z.infer<typeof trainingProgressSchema>
export type CatalogLessonActivityData = z.infer<
  typeof catalogLessonActivitySchema
>

// Union type
export type ActivityTableSectionData =
  | CategoryTrainingProgressData
  | CourseCompletionActivityData
  | LearningActivityData
  | TrainingProgressData
  | CatalogLessonActivityData

// Section schema definition
export const activityTableSchema: SectionSchemaDefinition = {
  section_type: 'activity-table',
  label: 'Activity Table',
  description: 'Display activity data in table format',
  metadata_fields: ['display_name', 'bgColor'],
  sub_types: {
    'category-training-progress': {
      label: 'Category Training Progress',
      section_data_schema: categoryTrainingProgressSchema,
    },
    'course-completion-activity': {
      label: 'Course Completion Activity',
      section_data_schema: courseCompletionActivitySchema,
    },
    'learning-activity': {
      label: 'Learning Activity',
      section_data_schema: learningActivitySchema,
    },
    'training-progress': {
      label: 'Training Progress',
      section_data_schema: trainingProgressSchema,
    },
    'catalog-lesson-activity': {
      label: 'Catalog Lesson Activity',
      section_data_schema: catalogLessonActivitySchema,
    },
  },
}
