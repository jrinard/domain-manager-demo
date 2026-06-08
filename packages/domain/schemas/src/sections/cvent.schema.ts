import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for cvent sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Cvent schema - minimal configuration
const cventSchema = z.object({})

// Export schema
export { cventSchema }

// Type inference
export type CventSectionData = z.infer<typeof cventSchema>

// Section schema definition
export const cventSchema_definition: SectionSchemaDefinition = {
  section_type: 'cvent',
  label: 'Cvent',
  description: 'Display Cvent events',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: cventSchema,
}
