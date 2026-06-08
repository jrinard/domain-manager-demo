import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for link sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

const baseSchema = z.object({
  icon_display: z
    .enum(['inline', 'above', 'background', 'none'])
    .default('inline'),
  iconOverride: z.number().optional().describe('Override icon with Attachment'),
  textOverride: z.string().optional().describe('Override link title'),
  target: z
    .enum(['_self', '_blank', '_top'])
    .optional()
    .describe('Link Behavior'),
})

// Generic link schema
const menuItemSchema = z.object({
  sub_type: z
    .literal('menu-item')
    .default('menu-item')
    .describe('Link destination type'),
  functionID: z.number().optional(),
  ...baseSchema.shape,
})

const customTabSchema = z.object({
  sub_type: z
    .literal('custom-tab')
    .default('custom-tab')
    .describe('Link destination type'),
  traitID: z.number().optional(),
  ...baseSchema.shape,
})

const externalLinkSchema = z.object({
  sub_type: z
    .literal('external-link')
    .default('external-link')
    .describe('Link destination type'),
  url: z.string().url().describe('Link URL'),
  ...baseSchema.shape,
})

// Export schema
export { menuItemSchema, customTabSchema, externalLinkSchema }

// Type inference
export type LinkMenuItemSectionData = z.infer<typeof menuItemSchema>
export type LinkCustomTabSectionData = z.infer<typeof customTabSchema>
export type LinkExternalLinkSectionData = z.infer<typeof externalLinkSchema>

// Section schema definition
export const linkSchema_definition: SectionSchemaDefinition = {
  section_type: 'link',
  label: 'Link',
  description: 'Generic link section',
  metadata_fields: [
    'display_name',
    'bgColor',
    'bgImage',
    'textColor',
    'padding',
    'rounding',
    'hideWhenNoPermission',
  ],
  sub_types: {
    'menu-item': {
      label: 'Menu Item',
      description: 'Link to a Menu Item',
      section_data_schema: menuItemSchema,
    },
    'custom-tab': {
      label: 'Custom Tab',
      description: 'Link to a Custom Tab',
      section_data_schema: customTabSchema,
    },
    'external-link': {
      label: 'External Link',
      description: 'Link to an external URL',
      section_data_schema: externalLinkSchema,
    },
  },
}
