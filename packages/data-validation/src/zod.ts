import { z } from 'zod'
// Re-export Zod for consistent imports across codebase
export * from 'zod'
export { z } from 'zod'

// Custom Zod extensions for our use case

// Reference types for system data
export const zTeamReference = z
  .number()
  .int()
  .positive()
  .describe('Team ID reference')

export const zPersonReference = z
  .number()
  .int()
  .positive()
  .describe('Person ID reference')

export const zImageReference = z
  .number()
  .int()
  .positive()
  .describe('Image primary key reference')

export const zCurriculumReference = z
  .number()
  .int()
  .positive()
  .describe('Curriculum ID reference')

// Common patterns
export const zOptionalString = z.string().optional()
export const zOptionalNumber = z.number().optional()
export const zPositiveInt = z.number().int().positive()
export const zNonEmptyString = z.string().min(1)

// Color scheme enum used across sections
export const zIconColorScheme = z
  .enum(['blue', 'green', 'purple', 'yellow', 'orange', 'red', 'gray'])
  .nullable()
  .optional()
  .describe('Icon color scheme')
