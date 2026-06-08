import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for OP sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// Base schema for OP section data
const baseOpData = z.object({
  sub_type: z.enum(['OP', 'Feed', 'Pet']).default('OP'),
  teamId: z
    .string()
    .default('2234295')
    .describe(
      'This section uses a file from the team library named "_Publications Subscription"(2234295)',
    ),
  coverOverride: z.number().optional().describe('Cover Override Image ID'),
  title: z.string().optional().describe('Section Title'),
  details_text: z.string().optional().describe('Description/Details Text'),
  left_button_text: z.string().optional().describe('Left Button Text'),
  right_button_text: z.string().optional().describe('Right Button Text'),
  url: z.string().optional().describe('URL for left button'),
})

// OP sub-type schema with OP-specific defaults
const opSubTypeSchema = baseOpData.extend({
  sub_type: z.literal('OP').default('OP'),
  odiTagOverride: z.number().optional().describe('ODI Tag Image ID'),
  title: z
    .string()
    .default('ODI Online Database of Ingredients')
    .describe('Section Title'),
  details_text: z
    .string()
    .default(
      'Search ingredients, research their proper use and create label review report.',
    )
    .describe('Description/Details Text'),
  left_button_text: z
    .string()
    .default('ENTER ODI')
    .describe('Left Button Text'),
  right_button_text: z
    .string()
    .default('AAFCO Official Publication Viewer')
    .describe('Right Button Text'),
  url: z.string().default('/odi').describe('URL for left button'),
})

// Feed sub-type schema with Feed-specific defaults
const feedSubTypeSchema = baseOpData.extend({
  sub_type: z.literal('Feed').default('Feed'),
  feedTagOverride: z.number().optional().describe('Feed Tag Image ID'),
  title: z.string().default('Feed Labeling Guide').describe('Section Title'),
  details_text: z
    .string()
    .default(
      'This guide will provide you with the necessary information and material so you can design and produce commercial, non-medicated, feed labels that meet the requirements listed in the AAFCO Model Bill and Regulations',
    )
    .describe('Description/Details Text'),
  left_button_text: z
    .string()
    .default('Feed Labeling Guide')
    .describe('Left Button Text'),
  right_button_text: z
    .string()
    .default('Feed Labeling Guide Viewer')
    .describe('Right Button Text'),
  url: z
    .string()
    .default('https://secure.fass.org/AAFCO_Digital_Downloads.asp')
    .describe('URL for left button'),
})

// Pet sub-type schema with Pet-specific defaults
const petSubTypeSchema = baseOpData.extend({
  sub_type: z.literal('Pet').default('Pet'),
  petTagOverride: z.number().optional().describe('Pet Tag Image ID'),
  title: z
    .string()
    .default('Pet Food Labeling Guide')
    .describe('Section Title'),
  details_text: z
    .string()
    .default(
      'This guide will provide you with the necessary information and material so you can design and produce commercial pet food and treat labels that meet the requirements listed in the AAFCO Model Pet Food and Specialty Pet Food Regulations.',
    )
    .describe('Description/Details Text'),
  left_button_text: z
    .string()
    .default('Pet Food Labeling Guide')
    .describe('Left Button Text'),
  right_button_text: z
    .string()
    .default('Pet Food Labeling Guide Viewer')
    .describe('Right Button Text'),
  url: z
    .string()
    .default('https://secure.fass.org/AAFCO_Digital_Downloads.asp')
    .describe('URL for left button'),
})

// Export schemas
export { opSubTypeSchema, feedSubTypeSchema, petSubTypeSchema }

// Type inference
export type OpSubTypeData = z.infer<typeof opSubTypeSchema>
export type FeedSubTypeData = z.infer<typeof feedSubTypeSchema>
export type PetSubTypeData = z.infer<typeof petSubTypeSchema>

// Union type for all OP section data
export type OpSectionData = OpSubTypeData | FeedSubTypeData | PetSubTypeData

// Section schema definition
export const opSchema_definition: SectionSchemaDefinition = {
  section_type: 'op',
  label: 'OP',
  description: 'AAFCO OP section',
  metadata_fields: ['display_name', 'bgColor'],
  sub_types: {
    OP: {
      label: 'OP',
      description: 'OP subtype',
      section_data_schema: opSubTypeSchema,
      info_fields: ['teamId'],
      display_groups: [
        {
          title: 'Configuration',
          properties: ['teamId', 'coverOverride', 'odiTagOverride'],
        },
        {
          title: 'Content',
          properties: [
            'title',
            'details_text',
            'left_button_text',
            'right_button_text',
            'url',
          ],
        },
      ],
    },
    Feed: {
      label: 'Feed',
      description: 'Feed subtype',
      section_data_schema: feedSubTypeSchema,
      info_fields: ['teamId'],
      display_groups: [
        {
          title: 'Configuration',
          properties: ['teamId', 'coverOverride', 'feedTagOverride'],
        },
        {
          title: 'Content',
          properties: [
            'title',
            'details_text',
            'left_button_text',
            'right_button_text',
            'url',
          ],
        },
      ],
    },
    Pet: {
      label: 'Pet',
      description: 'Pet subtype',
      section_data_schema: petSubTypeSchema,
      info_fields: ['teamId'],
      display_groups: [
        {
          title: 'Configuration',
          properties: ['teamId', 'coverOverride', 'petTagOverride'],
        },
        {
          title: 'Content',
          properties: [
            'title',
            'details_text',
            'left_button_text',
            'right_button_text',
            'url',
          ],
        },
      ],
    },
  },
  // Default section data schema (when no subtype is selected)
  section_data_schema: opSubTypeSchema,
  display_groups: [
    {
      title: 'Configuration',
      properties: ['teamId', 'coverOverride'],
    },
    {
      title: 'Content',
      properties: [
        'title',
        'details_text',
        'left_button_text',
        'right_button_text',
        'url',
      ],
    },
  ],
  // Fields that should be displayed as informational labels instead of input fields
  info_fields: ['teamId'],
}
