import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for enrolled training section
export const DEFAULT_COLUMN_SPAN = 12 as const

const enrolledTrainingSchema = z.object({
  top: z
    .number()
    .int()
    .positive()
    .default(10)
    .describe('Number of items to show'),
  sortBy: z
    .enum([
      'curriculumName',
      'startedDate',
      'dueDate',
      'modifiedDate',
      'registeredDate',
    ])
    .default('registeredDate')
    .describe('Sort field for enrolled training'),
  blockID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Block ID (optional)'),
  title: z.string().default('In Progress Training').describe('Optional title for the section'),
})

// Export schema
export { enrolledTrainingSchema }

// Type inference
export type MasteryEnrolledTrainingSectionData = z.infer<
  typeof enrolledTrainingSchema
>
export type MasteryInProgressEnrolledTrainingSectionData =
  MasteryEnrolledTrainingSectionData
// Backwards-compatible alias
export type EnrolledTrainingSectionData = MasteryEnrolledTrainingSectionData

// Section schema definition (mastery-inprogress-enrolled-training)
export const masteryInProgressEnrolledTrainingSchema_definition: SectionSchemaDefinition<
  typeof enrolledTrainingSchema
> = {
  section_type: 'mastery-inprogress-enrolled-training',
  label: 'In Progress Enrolled',
  description: 'Display recently enrolled training items (in progress)',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: enrolledTrainingSchema,
  display_groups: [
    {
      title: 'Settings',
      properties: ['top', 'sortBy', 'blockID', 'title'],
    },
  ],
}
// Backwards-compatible alias
export const enrolledTrainingSchema_definition =
  masteryInProgressEnrolledTrainingSchema_definition
