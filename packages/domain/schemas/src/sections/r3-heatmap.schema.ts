import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for r3-heatmap sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 3 as const

// R3 heatmap schema - minimal configuration
const r3HeatmapSchema = z.object({
  teamID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Team ID reference - Team to display R3 heatmap for'),
})

// Export schema
export { r3HeatmapSchema }

// Type inference
export type R3HeatmapSectionData = z.infer<typeof r3HeatmapSchema>

// Section schema definition
export const r3HeatmapSchema_definition: SectionSchemaDefinition = {
  section_type: 'r3-heatmap',
  label: 'R3 Heatmap',
  description: 'Display DISC profile heatmap for a team',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: r3HeatmapSchema,
}
