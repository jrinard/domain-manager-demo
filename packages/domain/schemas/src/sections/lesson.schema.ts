import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for lesson sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Display variant enum
const displayVariantEnum = z.enum(['library-card'])

// Lesson schema
const lessonSchema = z.object({
  lessonID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Lesson ID reference - Lesson asset to display'),

  display_variant: displayVariantEnum
    .default('library-card')
    .describe('Display style for the lesson'),
  hideLessonTitle: z
    .boolean()
    .optional()
    .describe('Hide the lesson title in the UI'),
})

// Export schema
export { lessonSchema }

// Type inference
export type LessonSectionData = z.infer<typeof lessonSchema>

// Section schema definition
export const lessonSchema_definition: SectionSchemaDefinition = {
  section_type: 'lesson',
  label: 'Lesson',
  description: 'Display a lesson asset',
  metadata_fields: [
    'display_name',
    'bgColor',
    'bgImage',
    'textColor',
    'padding',
    'rounding',
  ],
  section_data_schema: lessonSchema,
}
