import { z } from 'zod'

export interface DisplayGroup<
  TData extends z.ZodObject<any> = z.ZodObject<any>,
> {
  title: string
  description?: string
  properties: Array<keyof z.infer<TData> & string>
}

export type MetadataFields =
  | 'display_name'
  | 'description'
  | 'bgColor'
  | 'bgImage'
  | 'textColor'
  | 'rounding'
  | 'padding'
  | 'hideWhenNoPermission'

export interface SectionSchemaDefinition<
  TData extends z.ZodObject<any> = z.ZodObject<any>,
> {
  section_type: string
  label: string
  description?: string
  // Metadata fields relevant to this section
  metadata_fields?: MetadataFields[]
  // If section has sub_types
  sub_types?: Record<string, SubTypeSchemaDefinition<TData>>
  // If no sub_types, define section_data schema directly
  section_data_schema?: TData
  display_groups?: DisplayGroup<TData>[]
  // Fields that should be displayed as informational labels (read-only info) instead of input fields
  // Label and description come from the Zod schema's .describe() method
  info_fields?: Array<keyof z.infer<TData> & string>
}

export interface SubTypeSchemaDefinition<
  TData extends z.ZodObject<any> = z.ZodObject<any>,
> {
  label: string
  description?: string
  section_data_schema: TData
  display_groups?: DisplayGroup<TData>[]
  // Fields that should be displayed as informational labels (read-only info) instead of input fields
  // Label and description come from the Zod schema's .describe() method
  info_fields?: Array<keyof z.infer<TData> & string>
}

// Validator function
export function validateSectionData<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data)
  return result as any
}
