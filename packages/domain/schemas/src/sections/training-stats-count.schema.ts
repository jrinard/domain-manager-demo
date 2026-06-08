import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'
import { zDashboardFilters, zIconConfig } from '../fragments'

// Default column span for training-stats-count sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// Training stats count schema - similar to stats-count but for training-specific metrics
const trainingStatsCountSchema = z.object({
  ...zDashboardFilters.shape,
  ...zIconConfig.shape,
})

// Export schema
export { trainingStatsCountSchema }

// Type inference
export type TrainingStatsCountSectionData = z.infer<
  typeof trainingStatsCountSchema
>

// Section schema definition
export const trainingStatsCountSchema_definition: SectionSchemaDefinition = {
  section_type: 'training-stats-count',
  label: 'Training Stats Count',
  description: 'Display training-specific statistical counts',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: trainingStatsCountSchema,
}
