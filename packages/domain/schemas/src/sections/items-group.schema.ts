import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import {
  buttonMenuItemSchema,
  buttonCustomTabSchema,
  buttonExternalLinkSchema,
} from './button.schema'
import {
  menuItemSchema,
  customTabSchema,
  externalLinkSchema,
} from './link.schema'

export const DEFAULT_COLUMN_SPAN = 12 as const

const itemsGroupSchema = z.object({
  flow: z
    .enum(['row', 'column', 'grid'])
    .default('row')
    .describe('Items Flow Direction'),
  alignment: z
    .enum([
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ])
    .default('center-center')
    .describe(
      'Grid: 3×3 placement. Row: horizontal grouping only — items stretch to match the tallest in each row.',
    ),
  buttonWidth: z
    .enum(['auto', 'sm', 'md', 'lg', 'xl', '2xl', 'full'])
    .default('auto')
    .describe('Minimum Button Width'),
  items: z.array(
    z.union([
      // Button types
      buttonMenuItemSchema,
      buttonCustomTabSchema,
      buttonExternalLinkSchema,
      // Link types
      menuItemSchema,
      customTabSchema,
      externalLinkSchema,
    ]),
  ),
})

export { itemsGroupSchema }

export type ItemsGroupSectionData = z.infer<typeof itemsGroupSchema>

export const itemsGroupSchema_definition: SectionSchemaDefinition<
  typeof itemsGroupSchema
> = {
  section_type: 'items-group',
  label: 'Items Group',
  description: 'A group of buttons and/or links with configurable layout',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: itemsGroupSchema,
  display_groups: [
    {
      title: 'Items',
      properties: ['items'],
    },
    {
      title: 'Layout',
      properties: ['flow', 'alignment', 'buttonWidth'],
    },
  ],
}
