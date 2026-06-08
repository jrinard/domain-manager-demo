import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for recent training section
export const DEFAULT_COLUMN_SPAN = 12 as const

const recentTrainingSchema = z.object({
  top: z.number().int().positive().default(10).describe('Number of items to show'),
  sortBy: z
    .enum([
      'curriculumName',
      'startedDate',
      'dueDate',
      'modifiedDate',
      'registeredDate',
    ])
    .default('dueDate')
    .describe('Sort field for recent training'),
  title: z.string().optional().describe('Optional title for the section'),
})

// Export schema
export { recentTrainingSchema }

// Type inference
export type MasteryRecentTrainingSectionData = z.infer<typeof recentTrainingSchema>
// Backwards-compatible alias
export type RecentTrainingSectionData = MasteryRecentTrainingSectionData

// Section schema definition
export const masteryRecentTrainingSchema_definition: SectionSchemaDefinition<
  typeof recentTrainingSchema
> = {
  section_type: 'mastery-recent-training',
  label: 'Recent Training',
  description: 'Display a list of recent training items',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: recentTrainingSchema,
  display_groups: [
    {
      title: 'Settings',
      properties: ['top', 'sortBy', 'title'],
    },
  ],
}

// Backwards-compatible alias for older imports
export const recentTrainingSchema_definition = masteryRecentTrainingSchema_definition

