import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for library-link sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Library link schema
const libraryLinkSchema = z.object({
  link_type: z.literal('library').default('library').optional(),
})

// Export schema
export { libraryLinkSchema }

// Type inference
export type LibraryLinkSectionData = z.infer<typeof libraryLinkSchema>

// Section schema definition
export const libraryLinkSchema_definition: SectionSchemaDefinition = {
  section_type: 'library-link',
  label: 'Library Link',
  description: 'Link to library section',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: libraryLinkSchema,
}
