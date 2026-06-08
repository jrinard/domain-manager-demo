import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for header sections
export const DEFAULT_COLUMN_SPAN = 12 as const

const headerSchema = z.object({
  largeTagline: z
    .string()
    .default('Welcome to Mastery!')
    .describe('Large tagline text (H1)'),
  quoteText: z
    .string()
    .default(
      'Transform yourself and your team through the power of Belief, Operational Effectiveness and Leadership',
    )
    .describe('Quote text (H3)'),
  quoteFrom: z
    .string()
    .optional()
    .describe('Quote attribution (e.g., author name)'),
  signatureImageID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Signature Image (attachment selector)'),
  showButton: z.boolean().default(true).describe('Show button'),
  buttonLabel: z.string().default('Welcome').describe('Button label'),
  buttonVariant: z
    .enum([
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'outline',
      'ghost',
    ])
    .default('primary'),
  buttonSize: z
    .enum(['tiny', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl'])
    .default('medium')
    .optional()
    .describe('Button size'),
  buttonVideoPath: z
    .string()
    .optional()
    .describe(
      'Button video path (e.g., /v2/domains/1825957/videos/CardoneBackgroundVideo.mp4)',
    ),
})

// Export schema
export { headerSchema }

// Type inference
export type HeaderSectionData = z.infer<typeof headerSchema>

// Section schema definition (mastery-prefixed)
export const masteryHeaderSchema_definition: SectionSchemaDefinition<
  typeof headerSchema
> = {
  section_type: 'mastery-header',
  label: 'Header',
  description:
    'Mastery header section with tagline, quote, signature, and button',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: headerSchema,
  display_groups: [
    {
      title: 'Content',
      properties: ['largeTagline', 'quoteText', 'quoteFrom'],
    },
    {
      title: 'Signature',
      properties: ['signatureImageID'],
    },
    {
      title: 'Button',
      properties: [
        'showButton',
        'buttonLabel',
        'buttonVariant',
        'buttonSize',
        'buttonVideoPath',
      ],
    },
  ],
}

// Mastery-prefixed type alias for clarity and consistency with other sections
export type MasteryHeaderSectionData = HeaderSectionData
