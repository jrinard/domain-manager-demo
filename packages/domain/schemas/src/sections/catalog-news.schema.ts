import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for catalog-news sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// Category sort options
const categorySortEnum = z.enum(['group-by-category', 'show-category-as-tag'])

// Sort options
const sortEnum = z.enum(['alphabetical', 'publish-date'])

// Catalog news schema
const catalogNewsSchema = z.object({
  category_sort: categorySortEnum
    .default('group-by-category')
    .describe('How to display categories: grouped or as tags'),

  sort: sortEnum.default('publish-date').describe('How to sort news items'),

  newsCategoryID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      'Optional category ID to filter articles from a specific category',
    ),
})

// Export schema
export { catalogNewsSchema }

// Type inference
export type CatalogNewsSectionData = z.infer<typeof catalogNewsSchema>

// Section schema definition
export const catalogNewsSchema_definition: SectionSchemaDefinition = {
  section_type: 'catalog-news',
  label: 'Catalog News',
  description: 'Display news articles from the catalog',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: catalogNewsSchema,
}
