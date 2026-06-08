import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for reporting-training sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Reporting training schema - minimal configuration
const reportingTrainingSchema = z.object({})

// Export schema
export { reportingTrainingSchema }

// Type inference
export type ReportingTrainingSectionData = z.infer<
  typeof reportingTrainingSchema
>

// Section schema definition
export const reportingTrainingSchema_definition: SectionSchemaDefinition = {
  section_type: 'reporting-training',
  label: 'Reporting Training',
  description: 'Display reporting training information',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: reportingTrainingSchema,
}
