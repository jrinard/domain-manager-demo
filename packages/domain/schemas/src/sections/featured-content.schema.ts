import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for featured-content sections
export const DEFAULT_COLUMN_SPAN = 12 as const

// Featured Content schema
const featuredContentSchema = z.object({
  title: z.string().optional().describe('Section title'),
  showTitle: z
    .boolean()
    .default(true)
    .optional()
    .describe('Show/hide the section title'),
  columnCount: z
    .number()
    .int()
    .positive()
    .max(12)
    .default(3)
    .optional()
    .describe('Number of columns for the grid layout'),
  maxItems: z
    .number()
    .int()
    .positive()
    .default(12)
    .optional()
    .describe('Maximum number of featured items to display'),
})

// Export schema
export { featuredContentSchema }

// Type inference
export type FeaturedContentSectionData = z.infer<typeof featuredContentSchema>

// Section schema definition
export const featuredContentSchema_definition: SectionSchemaDefinition = {
  section_type: 'featured-content',
  label: 'Featured Content',
  description: 'Featured Library Items',
  metadata_fields: [
    'display_name',
    'bgColor',
    'bgImage',
    'textColor',
    'padding',
    'rounding',
  ],
  section_data_schema: featuredContentSchema,
}
