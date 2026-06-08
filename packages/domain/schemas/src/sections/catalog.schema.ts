import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for catalog section
export const DEFAULT_COLUMN_SPAN = 12 as const

// Catalog has no configurable settings for mastery - empty object
const catalogSchema = z.object({})

// Export schema
export { catalogSchema }

// Type inference
export type MasteryCatalogSectionData = z.infer<typeof catalogSchema>
// Backwards-compatible alias
export type CatalogSectionData = MasteryCatalogSectionData

// Section schema definition
export const catalogSchema_definition: SectionSchemaDefinition<
  typeof catalogSchema
> = {
  section_type: 'mastery-catalog',
  label: 'Catalog',
  description: 'Default view in Mastery when no other sections are active.',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: catalogSchema,
  display_groups: [],
}

// Provide mastery-prefixed export name
export const masteryCatalogSchema_definition = catalogSchema_definition
