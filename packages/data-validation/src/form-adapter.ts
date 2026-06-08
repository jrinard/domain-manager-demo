import { z } from 'zod'

export type InputType =
  | 'number'
  | 'select'
  | 'text'
  | 'md-wysiwyg'
  | 'multi-select'
  | 'checkbox'
  | 'array-of-numbers'
  | 'button-variant-picker'
  | 'buttons-list'
  | 'items-list'
  | 'banners-list'
  | 'news-category-picker'
  | 'curriculum-picker'
  | 'custom-tab-picker'
  | 'image-picker'
  | 'menu-item-picker'
  | 'person-picker'
  | 'team-picker'
  | 'toggle-with-icons'
  | 'alignment-toggle'
  | 'config-attachment-picker'
  | 'config-lesson-attachment-picker'
  | 'config-image-attachment-picker'

export interface FieldMetadata {
  type: string // Zod type name
  inputType: InputType
  label: string
  description?: string
  required: boolean
  default?: unknown
  options?: readonly (
    | string
    | number
    | { value: string | number; label: string }
  )[]
  min?: number
  max?: number
  placeholder?: string // Optional placeholder text
  // For reference types
  referenceType?:
    | 'image'
    | 'team'
    | 'person'
    | 'curriculum'
    | 'color'
    | 'menu-item'
    | 'custom-tab'
    | 'news-category'
    | 'config-attachment'
}

export interface FormMetadata {
  fields: Record<string, FieldMetadata>
}

/**
 * Converts a Zod schema to form metadata for rendering inputs
 */
export function zodToFormMetadata(schema: z.ZodObject<any>): FormMetadata {
  const shape = schema.shape
  const fields: Record<string, FieldMetadata> = {}

  for (const [fieldName, fieldSchema] of Object.entries(shape)) {
    fields[fieldName] = extractFieldMetadata(
      fieldSchema as z.ZodTypeAny,
      fieldName,
    )
  }

  return { fields }
}

function extractFieldMetadata(
  schema: z.ZodTypeAny,
  fieldName: string,
): FieldMetadata {
  const description = schema.description
  let unwrapped = schema

  // Extract placeholder from description if present
  let placeholder: string | undefined
  let cleanDescription = description
  if (description) {
    const placeholderMatch = description.match(/\[placeholder:([^\]]+)\]/)
    if (placeholderMatch) {
      placeholder = placeholderMatch[1]
      cleanDescription = (cleanDescription || '')
        .replace(/\[placeholder:[^\]]+\]\s*/, '')
        .trim()
    }
  }

  // Unwrap optional/nullable/default
  let required = true
  let defaultValue: unknown

  // Unwrap common wrappers (optional, nullable, default, effects) so we can inspect the core type
  while (
    unwrapped instanceof z.ZodOptional ||
    unwrapped instanceof z.ZodNullable ||
    unwrapped instanceof z.ZodDefault ||
    (unwrapped as any)?._def?.typeName === 'ZodEffects'
  ) {
    if (
      unwrapped instanceof z.ZodOptional ||
      unwrapped instanceof z.ZodNullable
    ) {
      required = false
      unwrapped =
        (unwrapped as any)._def?.innerType || (unwrapped as any)._def?.type
    } else if (unwrapped instanceof z.ZodDefault) {
      // In Zod v4, defaultValue can be either a function or a direct value
      const defValue = (unwrapped as any)._def?.defaultValue
      defaultValue = typeof defValue === 'function' ? defValue() : defValue
      unwrapped =
        (unwrapped as any)._def?.innerType || (unwrapped as any)._def?.type
    } else if ((unwrapped as any)?._def?.typeName === 'ZodEffects') {
      const d = (unwrapped as any)._def ?? (unwrapped as any).def
      // Zod 3/4: preprocess/refine may nest the schema under innerType or schema
      unwrapped = d?.innerType ?? d?.schema ?? d?.type
    }
  }

  // Determine input type based on Zod type
  let inputType: InputType = 'text'
  let options: any[] | undefined
  let referenceType: FieldMetadata['referenceType']
  let min: number | undefined
  let max: number | undefined

  if (unwrapped instanceof z.ZodNumber) {
    inputType = 'number'

    // Extract checks
    const checks = (unwrapped as any)._def.checks || []
    for (const check of checks) {
      if (check.kind === 'min') min = check.value
      if (check.kind === 'max') max = check.value
    }

    // Check description for reference hints
    if (description?.includes('Team ID')) {
      inputType = 'team-picker'
      referenceType = 'team'
    } else if (description?.includes('Person ID')) {
      inputType = 'person-picker'
      referenceType = 'person'
    } else if (description?.includes('Curriculum ID')) {
      inputType = 'curriculum-picker'
      referenceType = 'curriculum'
    } else if (
      description?.includes('Image') ||
      description?.includes('image') ||
      /imageID/i.test(fieldName)
    ) {
      inputType = 'config-image-attachment-picker'
      referenceType = 'config-attachment'
    } else if (/(functionID|function_id)/i.test(fieldName)) {
      inputType = 'menu-item-picker'
      referenceType = 'menu-item'
    } else if (/(traitID|trait_id)/i.test(fieldName)) {
      inputType = 'custom-tab-picker'
      referenceType = 'custom-tab'
    } else if (/(newsCategoryID|news_category_id)/i.test(fieldName)) {
      inputType = 'news-category-picker'
      referenceType = 'news-category'
    } else if (
      /(configAttachmentID|config_attachment_id|iconOverride)/i.test(fieldName)
    ) {
      inputType = 'config-attachment-picker'
      referenceType = 'config-attachment'
    } else if (
      /(configLessonID|config_lesson__id|^lessonID$)/i.test(fieldName)
    ) {
      inputType = 'config-lesson-attachment-picker'
      referenceType = 'config-attachment'
    } else if (
      /(configImageID|config_image__id|logoOverride|coverOverride|odiTagOverride|feedTagOverride|petTagOverride)/i.test(
        fieldName,
      )
    ) {
      inputType = 'config-image-attachment-picker'
      referenceType = 'config-attachment'
    }
  } else if (unwrapped instanceof z.ZodEnum) {
    inputType = 'select'

    // In Zod v4, enum values are in _def.options
    const enumDef: any = (unwrapped as any)._def || (unwrapped as any).def
    options = enumDef?.options || enumDef?.values

    if (!options && enumDef?.entries) {
      options = convertEntriesToOptions(enumDef.entries)
    }

    if (fieldName.includes('buttonVariant')) {
      inputType = 'button-variant-picker'
      referenceType = 'color'
    }
    // Special-case alignment enums to use a toggle group in the editor
    if (fieldName === 'alignment') {
      inputType = 'alignment-toggle'
    }
  } else if (unwrapped instanceof z.ZodArray) {
    // Support both Zod v3 and v4 shapes for array element defs
    const itemSubType: any = (() => {
      const arrDef: any = (unwrapped as any)?._def || (unwrapped as any)?.def
      if (!arrDef) return undefined
      // common places where the array element type may be stored across Zod versions
      return (
        arrDef.element ||
        arrDef.type ||
        arrDef.innerType ||
        arrDef._def?.type ||
        arrDef._def?.innerType
      )
    })()

    if (itemSubType && itemSubType instanceof z.ZodEnum) {
      inputType = 'multi-select'
      // Support both Zod v3 and v4 shapes for enum definitions
      const itemEnumDef: any =
        (itemSubType as any)._def || (itemSubType as any).def
      options = itemEnumDef?.options || itemEnumDef?.values

      if (!options && itemEnumDef?.entries) {
        options = convertEntriesToOptions(itemEnumDef.entries)
      }
    } else if (
      itemSubType &&
      (itemSubType instanceof z.ZodNumber || itemSubType instanceof z.ZodString)
    ) {
      inputType = 'multi-select'
    }

    // Check for role ID arrays (similar to buttonVariant check)
    if (
      itemSubType instanceof z.ZodNumber &&
      (fieldName.includes('roleID') || fieldName.includes('RoleID'))
    ) {
      inputType = 'array-of-numbers'
    }

    // Check for buttons array (array of union/discriminated union button types)
    if (
      fieldName === 'buttons' &&
      (itemSubType instanceof z.ZodUnion ||
        itemSubType instanceof z.ZodDiscriminatedUnion ||
        itemSubType instanceof z.ZodObject)
    ) {
      inputType = 'buttons-list'
    }

    // Check for items array (array of union/discriminated union button and link types)
    if (
      fieldName === 'items' &&
      (itemSubType instanceof z.ZodUnion ||
        itemSubType instanceof z.ZodDiscriminatedUnion ||
        itemSubType instanceof z.ZodObject)
    ) {
      inputType = 'items-list'
    }

    // Check for banners array (array of union/discriminated union banner types)
    if (
      fieldName === 'banners' &&
      (itemSubType instanceof z.ZodUnion ||
        itemSubType instanceof z.ZodDiscriminatedUnion ||
        itemSubType instanceof z.ZodObject)
    ) {
      inputType = 'banners-list'
    }
  } else if (unwrapped instanceof z.ZodBoolean) {
    inputType = 'checkbox'

    // Check if description starts with 'toggle-with-icons'
    if (description?.startsWith('toggle-with-icons')) {
      inputType = 'toggle-with-icons'
    }
  } else if (unwrapped instanceof z.ZodString) {
    inputType = 'text'

    // Special-case markdown content field
    if (fieldName === 'content' || fieldName === 'markdown') {
      inputType = 'md-wysiwyg'
    }

    // Extract min/max length
    const checks = (unwrapped as any)._def.checks || []
    for (const check of checks) {
      if (check.kind === 'min') min = check.value
      if (check.kind === 'max') max = check.value
    }
  }

  // Generate label from field name if not in description
  let label = fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/gi, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()

  // Normalize common acronyms: ensure "ID" and "IDs" stay together and uppercase
  label = label
    .replace(/\bI D s\b/g, 'IDs')
    .replace(/\bI Ds\b/g, 'IDs')
    .replace(/\bI D\b/g, 'ID')
    .replace(/\bIds\b/g, 'IDs')
    .replace(/\bId\b/g, 'ID')

  // Friendly labels for card color selects (same options as section Background Color)
  if (fieldName === 'itemBgColor') {
    options = [
      { value: 'none', label: 'No card' },
      { value: 'transparent', label: 'Transparent' },
      { value: 'site', label: 'Site Background' },
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
      { value: 'grey', label: 'Grayscale' },
      { value: 'contrast-low', label: 'Low Contrast' },
      { value: 'contrast-medium', label: 'Medium Contrast' },
      { value: 'contrast-high', label: 'High Contrast' },
    ]
  }
  if (fieldName === 'itemTextColor') {
    options = [
      { value: 'inherit', label: 'Inherit' },
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
      { value: 'muted', label: 'Muted' },
      { value: 'site', label: 'Site' },
      { value: 'grayscale-light', label: 'Grayscale Light' },
      { value: 'grayscale-dark', label: 'Grayscale Dark' },
    ]
  }
  if (fieldName === 'cardSize') {
    options = [
      {
        value: 'none',
        label:
          'Auto (row: all tabs match tallest; column/grid: height from content)',
      },
      {
        value: 'section-card',
        label: 'Section card (fixed ~230px — use with grid flow)',
      },
    ]
  }

  return {
    type:
      (unwrapped as any)?._def?.typeName ||
      (unwrapped as any)?.def?.typeName ||
      'ZodType',
    inputType,
    label,
    description: cleanDescription || undefined,
    required,
    default: defaultValue,
    options,
    referenceType,
    placeholder,
    min,
    max,
  }
}

function convertEntriesToOptions(
  entries: Readonly<Record<string, z.core.util.EnumValue>>,
): { value: string | number; label: string }[] {
  if (!entries) {
    return []
  }

  return Object.entries(entries).map(([key, value]) => ({
    value: value,
    label: `${key}`.replace(/(_|-)/gi, ' ').trim(),
  }))
}

/**
 * Gets field-specific errors from Zod validation result
 */
export function getFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {}

  for (const issue of error.issues) {
    const path = issue.path.join('.')
    if (!fieldErrors[path]) {
      fieldErrors[path] = []
    }
    fieldErrors[path].push(issue.message)
  }

  return fieldErrors
}
