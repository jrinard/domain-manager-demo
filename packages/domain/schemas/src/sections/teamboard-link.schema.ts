import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for teamboard-link sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Teamboard link schema
const teamboardLinkSchema = z.object({
  link_type: z.literal('teamboards').default('teamboards').optional(),
})

// Export schema
export { teamboardLinkSchema }

// Type inference
export type TeamboardLinkSectionData = z.infer<typeof teamboardLinkSchema>

// Section schema definition
export const teamboardLinkSchema_definition: SectionSchemaDefinition = {
  section_type: 'teamboard-link',
  label: 'Teamboard Link',
  description: 'Link to teamboards section',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: teamboardLinkSchema,
}
