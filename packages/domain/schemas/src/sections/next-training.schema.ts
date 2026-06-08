import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for next-training sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Next training schema - minimal configuration
const nextTrainingSchema = z.object({})

// Export schema
export { nextTrainingSchema }

// Type inference
export type NextTrainingSectionData = z.infer<typeof nextTrainingSchema>

// Section schema definition
export const nextTrainingSchema_definition: SectionSchemaDefinition = {
  section_type: 'next-training',
  label: 'Next Training',
  description: "Display user's next scheduled training",
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: nextTrainingSchema,
}
