import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import {
  buttonMenuItemSchema,
  buttonCustomTabSchema,
  buttonExternalLinkSchema,
} from './button.schema'

export const DEFAULT_COLUMN_SPAN = 12 as const

const logoAndButtonSchema = z.object({
  logoOverride: z.number().optional().describe('Logo Override Image ID'),
  logoAlt: z.string().default('Company Logo'),
  imageSize: z.number().int().min(1).max(12).default(4),
  buttons: z.array(
    z.union([
      buttonMenuItemSchema,
      buttonCustomTabSchema,
      buttonExternalLinkSchema,
    ]),
  ),
  buttonWidth: z
    .enum(['auto', 'sm', 'md', 'lg', 'xl', '2xl', 'full'])
    .default('auto')
    .describe('Minimum Button Width'),
  direction: z.enum(['row', 'column']).default('column').describe('Layout'),
  buttonsDirection: z
    .enum(['row', 'column'])
    .default('row')
    .describe('Buttons Flow Direction'),
})

export { logoAndButtonSchema }

export type LogoAndButtonSectionData = z.infer<typeof logoAndButtonSchema>

export const logoAndButtonSchema_definition: SectionSchemaDefinition<
  typeof logoAndButtonSchema
> = {
  section_type: 'logo-and-button',
  label: 'Logo and Buttons',
  description: 'Logo above a list of action buttons',
  metadata_fields: [
    'display_name',
    'bgColor',
    'bgImage',
    'rounding',
    'padding',
  ],
  section_data_schema: logoAndButtonSchema,
  display_groups: [
    {
      title: 'Logo',
      properties: ['logoOverride', 'logoAlt', 'imageSize'],
    },
    {
      title: 'Buttons Config',
      properties: ['buttons'],
    },
    {
      title: 'Layout',
      properties: ['direction'],
    },
  ],
}
