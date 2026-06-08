import { z } from '@spacedock/data-validation'
import type { SectionSchemaDefinition } from '@spacedock/data-validation'

// Default column span for links section
export const DEFAULT_COLUMN_SPAN = 12 as const

const linksSchema = z.object({
  //Status Filters (choose which statuses to show)
  showCompleted: z.boolean().default(false),
  showInProgress: z.boolean().default(false),
  showNotStarted: z.boolean().default(false),

  // Search options
  searchDocuments: z.boolean().default(true),
  searchVideos: z.boolean().default(true),
  omitSearch: z.boolean().default(false),

  // Sections options
  showInProgressSection: z.boolean().default(false),
  showCategories: z
    .boolean()
    .default(true)
    .describe('Featured Courses Section'),
  showCourses: z
    .boolean()
    .default(false)
    .describe('My Enrolled Training Section'),

  // Catalog Grouping - Shown in Filter
  showMyDomainOnly: z.boolean().default(true),
  showAlwaysRestrictedCategories: z.boolean().default(false),

  //Actual Button Links and Button Text Shown
  showEnrolledTrainingLink: z.boolean().default(true),
  enrolledTrainingLinkText: z.string().default('Enrolled Training'),
  showAssignmentsLink: z.boolean().default(true),
  assignmentsButtonText: z.string().default('Assignments'),
  showTeamHistoryLink: z.boolean().default(true),
  teamHistoryButtonText: z.string().default('Team Reports'),
  showTranscriptLink: z.boolean().default(true),
  transcriptButtonText: z.string().default('Transcript'),
  showHistoryLink: z.boolean().default(false),
  historyButtonText: z.string().default('History'),
  showCertificationsLink: z.boolean().default(true),
  certificationsButtonText: z.string().default('Certificates'),
})

// Export schema
export { linksSchema }

// Type inference
export type MasteryLinksSectionData = z.infer<typeof linksSchema>
// Backwards-compatible alias
export type LinksSectionData = MasteryLinksSectionData

// Section schema definition
export const masteryLinksSchema_definition: SectionSchemaDefinition<
  typeof linksSchema
> = {
  section_type: 'mastery-links',
  label: 'Links',
  description: 'Configurable links block for mastery domains',
  metadata_fields: ['display_name', 'bgColor'],
  section_data_schema: linksSchema,
  display_groups: [
    {
      title: 'Status Filter',
      properties: ['showCompleted', 'showInProgress', 'showNotStarted'],
    },
    {
      title: 'Also Search',
      properties: ['searchDocuments', 'searchVideos', 'omitSearch'],
    },
    {
      title: 'Sections',
      properties: [
        'showInProgress',
        'showCourses',
        'showEnrolledTrainingLink',
        'enrolledTrainingLinkText',
        'showInProgressSection',
      ],
    },
    {
      title: 'Catalog',
      properties: ['showMyDomainOnly', 'showAlwaysRestrictedCategories'],
    },
    {
      title: 'Links',
      properties: [
        'showHistoryLink',
        'showAssignmentsLink',
        'showTeamHistoryLink',
        'teamHistoryButtonText',
        'transcriptButtonText',
        'showTranscriptLink',
        'historyButtonText',
        'showCertificationsLink',
        'certificationsButtonText',
        'showCategories',
      ],
    },
  ],
}
// Backwards-compatible alias
export const linksSchema_definition = masteryLinksSchema_definition
