import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import { itemsGroupSchema } from './items-group.schema'

// Default column span for custom-tabs sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// Extend the items-group schema and add icon_display
const customTabsSchema = z.object({
  icon_display: z
    .enum(['inline', 'above', 'background', 'none'])
    .default('inline')
    .describe('Icon display style'),
  hideArrow: z.boolean().optional().describe('Hide the right-arrow indicator'),
  /** Card background color - independent of section bg. Same options as section Background Color. */
  itemBgColor: z
    .enum([
      'none',
      'transparent',
      'site',
      'primary',
      'secondary',
      'grey',
      'contrast-low',
      'contrast-medium',
      'contrast-high',
    ])
    .optional()
    .describe('Card background color (independent of section). "none" = no card.'),
  /** Card text color for inverted styling (e.g. primary bg + light text). */
  itemTextColor: z
    .enum([
      'inherit',
      'primary',
      'secondary',
      'muted',
      'site',
      'grayscale-light',
      'grayscale-dark',
    ])
    .optional()
    .describe('Card text color when using colored background.'),
  /** Optional fixed card height. Row flow equalizes sibling heights; section-card pins ~230px (e.g. grid). */
  cardSize: z
    .enum(['section-card', 'none'])
    .optional()
    .describe(
      'Auto: height from content; in row flow, tabs share the tallest height. Section-card: fixed ~230px — mainly for grid.',
    ),
  ...itemsGroupSchema.omit({ items: true }).shape,
})

export { customTabsSchema }

export type CustomTabsSectionData = z.infer<typeof customTabsSchema>

export const customTabsSchema_definition: SectionSchemaDefinition<
  typeof customTabsSchema
> = {
  section_type: 'custom-tabs',
  label: 'Custom Tabs',
  description: 'Display user-assigned custom tabs in a configurable layout',
  metadata_fields: ['display_name', 'bgColor', 'rounding'],
  section_data_schema: customTabsSchema,
  display_groups: [
    {
      title: 'Display',
      properties: [
        'icon_display',
        'hideArrow',
        'itemBgColor',
        'itemTextColor',
        'cardSize',
      ],
    },
    {
      title: 'Layout',
      properties: ['flow', 'alignment', 'buttonWidth'],
    },
  ],
}
