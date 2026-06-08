import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for search sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// Search schema
const searchSchema = z.object({
  placeholder: z
    .string()
    .default('Search')
    .describe('Placeholder text for the search input'),
  header_image: z
    .number()
    .optional()
    .describe('Optional Header Image (attachment selector)'),
  header_image_width: z
    .enum(['1/4', '1/3', '1/2', '3/4', 'full'])
    .default('1/4')
    .describe('Header image width relative to search input'),
  border_radius: z
    .enum(['none', '8px', '25px'])
    .default('8px')
    .describe('Border radius for the search input'),
  can_search_menu: z
    .boolean()
    .default(true)
    .describe('Enable searching through menu items'),
  can_search_people: z
    .boolean()
    .default(true)
    .describe('Enable searching for people in the domain'),
})

// Export schema
export { searchSchema }

// Type inference
export type SearchSectionData = z.infer<typeof searchSchema>

// Section schema definition
export const searchSchema_definition: SectionSchemaDefinition = {
  section_type: 'search',
  label: 'Search',
  description: 'Display a search input with optional header image',
  metadata_fields: ['display_name', 'bgColor', 'bgImage', 'padding'],
  section_data_schema: searchSchema,
}
