import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for title-and-buttons sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// URL item within the buttons list
const urlItemSchema = z.object({
  url: z.string().min(1).describe('Destination URL'),
  urlImageSrc: z.string().min(1).describe('Button image URL'),
  urlImageAltText: z.string().optional().describe('Alt text for button image'),
  functionID: z.number().optional().describe('Optional internal FunctionID'),
})

// Title and Buttons schema (legacy Tryyb compatible)
const titleAndButtonsSchema = z.object({
  welcomeText: z
    .string()
    .default('Welcome,')
    .describe('Welcome text e.g., "Welcome,"'),
  welcomeUser: z.boolean().default(true).describe('Append user first name'),
  subText: z
    .string()
    .default('Welcome to your resource hub.')
    .describe('Subtitle text'),
  urlImageSrc: z.string().optional().describe('Optional header image URL'),
  justify: z
    .enum(['left', 'center', 'right'])
    .default('center')
    .describe('Alignment'),
  showItemsInMobileOnly: z
    .boolean()
    .optional()
    .describe('Show the buttons list only on mobile breakpoints'),
  // Use string keys for arbitrary style map
  style: z
    .record(z.string(), z.any())
    .optional()
    .describe('Arbitrary style overrides'),
  items: z
    .array(urlItemSchema)
    .default([])
    .describe('List of linked button images'),
})

// Export schema
export { titleAndButtonsSchema }

// Type inference
export type TitleAndButtonsSectionData = z.infer<typeof titleAndButtonsSchema>

// Section schema definition
export const titleAndButtonsSchema_definition: SectionSchemaDefinition = {
  section_type: 'title-and-buttons',
  label: 'Title and Buttons',
  description: 'Welcome block with optional image and a row of linked buttons',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: titleAndButtonsSchema,
}
