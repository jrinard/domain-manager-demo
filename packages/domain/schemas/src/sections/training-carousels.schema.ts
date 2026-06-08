import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for training-carousels sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// Training carousels schema
const trainingCarouselsSchema = z.object({
  categories: z
    .array(
      z.union([
        z.number().int().positive(),
        z.object({ catalogID: z.number().int().positive() }),
      ]),
    )
    .optional()
    .describe('Category IDs to display'),

  status_filters: z
    .array(
      z.enum(['ocINCOMPLETE', 'ocINPROGRESS', 'ocNOTATTEMPTED', 'ocCOMPLETE']),
    )
    .optional()
    .describe('Training status filters'),

  continue_watching_scope: z
    .enum([
      'present-in-categories',
      'not-present-in-categories',
      'direct-enrollments',
      'all-enrolled-training',
      'hidden',
    ])
    .default('not-present-in-categories')
    .describe('Scope for continue watching section'),
})

// Export schema
export { trainingCarouselsSchema }

// Type inference
export type TrainingCarouselsSectionData = z.infer<
  typeof trainingCarouselsSchema
>

// Section schema definition
export const trainingCarouselsSchema_definition: SectionSchemaDefinition = {
  section_type: 'training-carousels',
  label: 'Training Carousels',
  description: 'Display training courses in carousel format',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: trainingCarouselsSchema,
}
