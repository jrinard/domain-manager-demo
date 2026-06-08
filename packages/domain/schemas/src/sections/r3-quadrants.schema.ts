import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for r3-quadrants sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// R3 quadrants schema - no configuration needed (uses current user)
const r3QuadrantsSchema = z.object({})

// Export schema
export { r3QuadrantsSchema }

// Type inference
export type R3QuadrantsSectionData = z.infer<typeof r3QuadrantsSchema>

// Section schema definition
export const r3QuadrantsSchema_definition: SectionSchemaDefinition = {
  section_type: 'r3-quadrants',
  label: 'R3 Quadrants',
  description: "Display user's DISC profile quadrants",
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: r3QuadrantsSchema,
}
