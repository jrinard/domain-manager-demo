import { z } from '@spacedock/data-validation'

export const zDashboardFilters = z.object({
  domainIDFilters: z
    .array(z.number().int().positive())
    .optional()
    .describe('Filter by specific domain IDs'),

  teamIDFilters: z
    .array(z.number().int().positive())
    .optional()
    .describe('Filter by specific team IDs'),

  categoryNameMatch: z
    .string()
    .optional()
    .describe('Include categories matching this name'),

  categoryNameNotMatch: z
    .string()
    .optional()
    .describe('Exclude categories matching this name'),

  daysCount: z
    .number()
    .int()
    .positive()
    .default(30)
    .describe('Number of days to look back'),

  teamID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Team ID reference - Specific team to display data for'),

  memberID: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Person ID reference - Specific member to display data for'),

  curriculumIDs: z
    .array(
      z.union([
        z.number().int().positive(),
        z.object({
          curriculumID: z.number().int().positive(),
          curriculumName: z.string(),
        }),
      ]),
    )
    .optional()
    .describe('Curriculum ID references'),
})

