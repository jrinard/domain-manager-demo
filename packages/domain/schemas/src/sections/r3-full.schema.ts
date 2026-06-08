import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for r3-full sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// R3 full schema - no configuration needed (uses current user)
const r3FullSchema = z.object({})

// Export schema
export { r3FullSchema }

// Type inference
export type R3FullSectionData = z.infer<typeof r3FullSchema>

// Section schema definition
export const r3FullSchema_definition: SectionSchemaDefinition = {
  section_type: 'r3-full',
  label: 'R3 Full',
  description: 'Display R3 full format section',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: r3FullSchema,
}
