import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span (exported via sections/index)
export const DEFAULT_COLUMN_SPAN = 6 as const

const textSchema = z.object({
  content: z
    .string()
    .default('# Welcome\n\nWelcome to your resource hub. You can use markdown here to create headings, paragraphs, links, and lists.')
    .describe('Markdown content'),
})

export { textSchema }

export type TextSectionData = z.infer<typeof textSchema>

export const textSchema_definition: SectionSchemaDefinition<typeof textSchema> =
  {
    section_type: 'text',
    label: 'Text Section',
    description: 'Simple text block',
  metadata_fields: ['display_name', 'bgColor', 'textColor', 'padding', 'rounding'],
  section_data_schema: textSchema,
  display_groups: [
    {
      title: 'Content',
      properties: ['content'],
    },
  ],
  }
