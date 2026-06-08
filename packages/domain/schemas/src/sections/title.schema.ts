import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for title sections (exported with prefixed name from index)
export const DEFAULT_COLUMN_SPAN = 12 as const

// Title sub-type schemas
const teamTitleSchema = z.object({
  sub_type: z.literal('team').default('team'),
  memberID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Team ID reference - Team to display'),
  title: z.string().optional().describe('Custom title text'),
})

const primaryTeamTitleSchema = z.object({
  sub_type: z.literal('primary-team').default('primary-team'),
  title: z.string().optional().describe('Custom title text'),
})

const personTitleSchema = z.object({
  sub_type: z.literal('person').default('person'),
  memberID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Person ID reference - Person to display'),
  title: z.string().optional().describe('Custom title text'),
})

// Export schemas
export { teamTitleSchema, primaryTeamTitleSchema, personTitleSchema }

// Type inference
export type TeamTitleData = z.infer<typeof teamTitleSchema>
export type PrimaryTeamTitleData = z.infer<typeof primaryTeamTitleSchema>
export type PersonTitleData = z.infer<typeof personTitleSchema>

// Union type for all title data
export type TitleSectionData =
  | TeamTitleData
  | PrimaryTeamTitleData
  | PersonTitleData

// Section schema definition
export const titleSchema: SectionSchemaDefinition = {
  section_type: 'title',
  label: 'Title',
  description: 'Display title section for team or person',
  metadata_fields: [
    'display_name',
    'description',
    'bgColor',
    'bgImage',
    'textColor',
    'padding',
    'rounding',
  ],
  sub_types: {
    team: {
      label: 'Team Title',
      description: 'Display a specific team name',
      section_data_schema: teamTitleSchema,
    },
    'primary-team': {
      label: 'Primary Team Title',
      description: "Display user's primary team name",
      section_data_schema: primaryTeamTitleSchema,
    },
    person: {
      label: 'Person Title',
      description: "Display a person's name",
      section_data_schema: personTitleSchema,
    },
  },
}
