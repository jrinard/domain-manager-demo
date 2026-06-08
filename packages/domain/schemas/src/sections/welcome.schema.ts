import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import {
  buttonMenuItemSchema,
  buttonCustomTabSchema,
  buttonExternalLinkSchema,
} from './button.schema'

// Default column span (exported via sections/index)
export const DEFAULT_COLUMN_SPAN = 12 as const

const welcomeSchema = z.object({
  welcomeText: z.string().default('Welcome,'),
  welcomeUser: z.boolean().default(true),
  // Editor-facing field to hide the person name (optional for backward compatibility)
  hidePersonName: z.boolean().optional().describe('Hide the person name in the welcome text'),
  description: z.string().default('Welcome to your resource hub.'),
  // Support multiple buttons like Logo & Buttons
  buttons: z
    .array(
      z.union([buttonMenuItemSchema, buttonCustomTabSchema, buttonExternalLinkSchema]),
    )
    .optional(),
  direction: z.enum(['row', 'column']).default('row').describe('Layout'),
  flow: z
    .enum(['forward', 'reverse'])
    .default('forward')
    .describe('Flow direction: forward (text left) or reverse (text right)'),
})

export { welcomeSchema }

export type WelcomeSectionData = z.infer<typeof welcomeSchema>

export const welcomeSchema_definition: SectionSchemaDefinition<
  typeof welcomeSchema
> = {
  section_type: 'welcome',
  label: 'Welcome',
  description: 'Welcome with user name and one or more buttons',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: welcomeSchema,
  display_groups: [
    {
      title: 'General',
      properties: ['welcomeText', 'hidePersonName', 'description'],
    },
    {
      title: 'Layout',
      description: 'The Layout of the Section',
      properties: ['direction', 'flow'],
    },
    {
      title: 'Destination',
      properties: ['buttons'],
    },
  ],
}
