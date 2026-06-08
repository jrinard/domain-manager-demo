import type { z } from '@spacedock/data-validation'
import type { HomeSectionType } from './types'
import { getSectionSchema, getZodSchema } from './registry'

/**
 * Generate mock/default data for a section based on its Zod schema
 * Uses default values from the schema where available, otherwise uses falsey values
 */
export function generateMockSectionData(
  sectionType: HomeSectionType,
): Record<string, unknown> {
  const sectionSchema = getSectionSchema(sectionType)

  if (!sectionSchema) {
    console.error(`No schema found for section type: ${sectionType}`)
    return {}
  }

  // If there are sub_types, use the first one as default
  if (sectionSchema.sub_types) {
    const subTypeKeys = Object.keys(sectionSchema.sub_types)
    if (subTypeKeys.length > 0) {
      const defaultSubType = subTypeKeys[0]
      const zodSchema = getZodSchema(sectionType, defaultSubType)

      if (zodSchema) {
        return generateDataFromZodSchema(zodSchema, {
          sub_type: defaultSubType,
        })
      }
    }
  }

  // No sub_types, use the main schema
  const zodSchema = getZodSchema(sectionType)
  if (zodSchema) {
    return generateDataFromZodSchema(zodSchema)
  }

  return {}
}

/**
 * Generate data from a Zod schema by extracting defaults and using falsey values for required fields
 */
function generateDataFromZodSchema(
  schema: z.ZodTypeAny,
  initialData: Record<string, unknown> = {},
): Record<string, unknown> {
  try {
    // Try parsing with initial data to get defaults applied
    const parseResult = schema.safeParse(initialData)

    if (parseResult.success) {
      // @ts-expect-error - parseResult.data is typed as Record<string, unknown>
      return parseResult.data
    }

    // If parsing fails, try to extract shape and build defaults manually
    if ('shape' in schema && typeof schema.shape === 'object') {
      const shape = schema.shape as Record<string, z.ZodTypeAny>
      const result: Record<string, unknown> = { ...initialData }

      for (const [key, fieldSchema] of Object.entries(shape)) {
        // Skip if already in initial data
        if (key in initialData) continue

        // Try to extract default
        if ('_def' in fieldSchema) {
          const def = (fieldSchema as any)._def

          // Check for default value
          if (def.defaultValue !== undefined) {
            result[key] =
              typeof def.defaultValue === 'function'
                ? def.defaultValue()
                : def.defaultValue
          } else if (def.typeName === 'ZodOptional') {
            // Optional fields can be omitted
            continue
          } else if (def.typeName === 'ZodDefault') {
            const defaultFn = def.defaultValue
            result[key] =
              typeof defaultFn === 'function' ? defaultFn() : defaultFn
          } else if (def.typeName === 'ZodString') {
            result[key] = ''
          } else if (def.typeName === 'ZodNumber') {
            result[key] = 0
          } else if (def.typeName === 'ZodBoolean') {
            result[key] = false
          } else if (def.typeName === 'ZodArray') {
            result[key] = []
          } else if (def.typeName === 'ZodObject') {
            result[key] = {}
          } else if (def.typeName === 'ZodLiteral') {
            result[key] = def.value
          } else if (def.typeName === 'ZodEnum') {
            // Use first enum value as default
            if (
              def.values &&
              Array.isArray(def.values) &&
              def.values.length > 0
            ) {
              result[key] = def.values[0]
            }
          }
        }
      }

      return result
    }

    // Fallback: return initial data
    return initialData
  } catch (error) {
    console.error(`Error generating mock data for schema:`, error)
    return initialData
  }
}
