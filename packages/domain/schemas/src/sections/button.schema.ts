import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import {
  menuItemSchema as linkMenuItemSchema,
  customTabSchema as linkCustomTabSchema,
  externalLinkSchema as linkExternalLinkSchema,
} from './link.schema'

// Default column span for link sections (exported with prefixed name from index)
export const BUTTON_DEFAULT_COLUMN_SPAN = 3 as const

const baseSchema = z.object({
  buttonVariant: z
    .enum([
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'ghost',
      'ghost-primary',
      'ghost-danger',
      'outline',
      'neutral',
      'fill',
      'shadow',
    ])
    .default('primary'),
  textOverride: z.string().optional().describe('Button Text Override'),
  buttonSize: z
    .enum(['tiny', 'small', 'medium', 'large', 'xlarge', 'xxlarge'])
    .default('medium')
    .optional(),
})

// Generic link schema
const buttonMenuItemSchema = z.object({
  ...linkMenuItemSchema.omit({
    icon_display: true,
    iconOverride: true,
    textOverride: true,
  }).shape,
  ...baseSchema.shape,
})

const buttonCustomTabSchema = z.object({
  ...linkCustomTabSchema.omit({
    icon_display: true,
    iconOverride: true,
    textOverride: true,
  }).shape,
  ...baseSchema.shape,
})

const buttonExternalLinkSchema = z.object({
  ...linkExternalLinkSchema.omit({
    icon_display: true,
    iconOverride: true,
    textOverride: true,
  }).shape,
  ...baseSchema.shape,
})

// Export schema
export { buttonMenuItemSchema, buttonCustomTabSchema, buttonExternalLinkSchema }

// Type inference
export type ButtonMenuItemSectionData = z.infer<typeof buttonMenuItemSchema>
export type ButtonCustomTabSectionData = z.infer<typeof buttonCustomTabSchema>
export type ButtonExternalLinkSectionData = z.infer<
  typeof buttonExternalLinkSchema
>

// Section schema definition
export const buttonSchema_definition: SectionSchemaDefinition = {
  section_type: 'button',
  label: 'Button',
  description: 'Generic link section',
  metadata_fields: ['display_name', 'bgColor', 'textColor'],
  sub_types: {
    'menu-item': {
      label: 'Menu Item',
      description: 'Link to a Menu Item',
      section_data_schema: buttonMenuItemSchema,
    },
    'custom-tab': {
      label: 'Custom Tab',
      description: 'Link to a Custom Tab',
      section_data_schema: buttonCustomTabSchema,
    },
    'external-link': {
      label: 'External Link',
      description: 'Link to an external URL',
      section_data_schema: buttonExternalLinkSchema,
    },
  },
}
