import React, { useMemo } from 'react'
import type { z } from '@spacedock/data-validation'
import type { DisplayGroup } from '@spacedock/data-validation'
import { zodToFormMetadata } from '@spacedock/data-validation'
import { SchemaFormField } from './SchemaFormField'
import type { DomainUI } from '@spacedock/manifest'

interface SchemaFormProps {
  configID: string
  domainID?: number
  sectionId?: string
  schema: z.ZodObject<any>
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
  ) => void
  errors?: Record<string, string>
  /**
   * Optional function to determine if a field should be hidden
   * Useful for conditional fields based on other values
   */
  shouldHideField?: (fieldKey: string, data: Record<string, any>) => boolean
  renderHorizontal?: boolean
  /**
   * Optional display groups to control field ordering and grouping
   */
  displayGroups?: DisplayGroup<any>[]
}

export const SchemaForm = ({
  configID,
  domainID,
  sectionId,
  schema,
  data,
  onChange,
  onAttachmentsChange,
  errors = {},
  shouldHideField,
  renderHorizontal = false,
  displayGroups,
}: SchemaFormProps) => {
  // Extract field metadata from Zod schema
  const fields = useMemo(() => {
    const metadata = zodToFormMetadata(schema)
    return metadata.fields
  }, [schema])

  const handleFieldChange = (key: string, value: any) => {
    onChange({
      ...data,
      [key]: value,
    })
  }

  // Filter out hidden fields
  const visibleFields = useMemo(() => {
    return Object.entries(fields).filter(([key]) => {
      return !shouldHideField?.(key, data)
    })
  }, [fields, data, shouldHideField])

  // Group fields by display_groups when provided, otherwise use default grouping
  const groupedFields = useMemo(() => {
    if (!renderHorizontal) return null

    if (displayGroups && displayGroups.length > 0) {
      // Use display_groups from schema definition
      const groups = new Map<
        string,
        {
          title: string
          description?: string
          fields: Array<[string, (typeof fields)[string]]>
        }
      >()
      const assignedFields = new Set<string>()

      // First, organize fields according to display_groups
      displayGroups.forEach((group) => {
        const groupFields: Array<[string, (typeof fields)[string]]> = []

        group.properties.forEach((propName) => {
          const fieldEntry = visibleFields.find(([key]) => key === propName)
          if (fieldEntry) {
            groupFields.push(fieldEntry)
            assignedFields.add(propName)
          }
        })

        if (groupFields.length > 0) {
          groups.set(group.title, {
            title: group.title,
            description: group.description,
            fields: groupFields,
          })
        }
      })

      // Add any remaining fields not in a group to "Other Properties"
      const otherFields = visibleFields.filter(
        ([key]) => !assignedFields.has(key),
      )
      if (otherFields.length > 0) {
        groups.set('Other Properties', {
          title: 'Other Properties',
          fields: otherFields,
        })
      }

      return Array.from(groups.entries()).map(
        ([_, groupData]) => [groupData.title, groupData.fields] as const,
      )
    }

    // Fallback: no display_groups, use default grouping
    const groups = new Map<string, Array<[string, (typeof fields)[string]]>>()
    visibleFields.forEach(([key, field]) => {
      const groupName = 'default'
      if (!groups.has(groupName)) {
        groups.set(groupName, [])
      }
      groups.get(groupName)!.push([key, field])
    })

    return Array.from(groups.entries())
  }, [visibleFields, renderHorizontal, fields, displayGroups])

  if (visibleFields.length === 0) {
    return (
      <div className="text-xs text-gray-400">
        No editable fields for this section type
      </div>
    )
  }

  if (renderHorizontal && groupedFields) {
    // Render grouped fields in columns
    const hideButton = data.hideButton === true
    const hasNamedGroups = groupedFields.some(
      ([groupName]) => groupName !== 'default',
    )

    // If no named groups, just render fields in a row without grouping borders
    if (!hasNamedGroups) {
      return (
        <div className="flex gap-3 overflow-x-auto">
          {visibleFields.map(([key, field]) => (
            <div key={key} className="min-w-[180px]">
              <SchemaFormField
                configID={configID}
                domainID={domainID}
                field={field}
                fieldKey={key}
                value={data[key]}
                onChange={(value) => handleFieldChange(key, value)}
                error={errors[key]}
                onAttachmentsChange={onAttachmentsChange}
                renderHorizontal={renderHorizontal}
              />
            </div>
          ))}
        </div>
      )
    }

    // Render with grouping borders when named groups exist
    return (
      <div className="flex max-h-[220px] gap-3 overflow-x-auto overflow-y-auto ">
        {groupedFields.map(([groupName, groupFields]) => {
          // Apply opacity to button-related groups when hideButton is true
          const isButtonRelated = [
            'button-config',
            'destination',
            'visibility',
          ].includes(groupName)
          const shouldDim =
            hideButton && isButtonRelated && groupName !== 'button-config'

          return (
            <div
              key={groupName}
              className={`border-grayscale-700 bg-grayscale-900 flex flex-col gap-1.5 rounded border p-1.5 transition-opacity ${shouldDim ? 'opacity-40' : ''}`}
            >
              {groupFields.map(([key, field]) => (
                <div key={key} className="min-w-[180px]">
                  <SchemaFormField
                    configID={configID}
                    domainID={domainID}
                    field={field}
                    fieldKey={key}
                    value={data[key]}
                    onChange={(value) => handleFieldChange(key, value)}
                    error={errors[key]}
                    onAttachmentsChange={onAttachmentsChange}
                    renderHorizontal={renderHorizontal}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    )
  }
  /*Default verticle section list  */
  return (
    <div className="space-y-3">
      {visibleFields.map(([key, field]) => (
        <SchemaFormField
          key={key}
          configID={configID}
          domainID={domainID}
          sectionId={sectionId}
          field={field}
          fieldKey={key}
          value={data[key]}
          onChange={(value) => handleFieldChange(key, value)}
          error={errors[key]}
          onAttachmentsChange={onAttachmentsChange}
          renderHorizontal={renderHorizontal}
        />
      ))}
    </div>
  )
}

/**
 * Schema Form with validation
 * Automatically validates data against schema and shows errors
 */
interface ValidatedSchemaFormProps extends Omit<SchemaFormProps, 'errors'> {
  configID: string
  domainID?: number
  /**
   * If true, validates on every change
   * If false, only validates when explicitly called
   */
  validateOnChange?: boolean
  /**
   * Callback when validation state changes
   */
  onValidationChange?: (
    isValid: boolean,
    errors: Record<string, string>,
  ) => void
  /**
   * If true, renders fields in a horizontal row instead of vertical stack
   */
  renderHorizontal?: boolean
  /**
   * Optional display groups to control field ordering and grouping
   */
  displayGroups?: DisplayGroup<any>[]
}

export const ValidatedSchemaForm = ({
  configID,
  domainID,
  schema,
  data,
  onChange,
  onAttachmentsChange,
  shouldHideField,
  validateOnChange = false,
  onValidationChange,
  renderHorizontal = false,
  displayGroups,
}: ValidatedSchemaFormProps) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = React.useCallback(() => {
    const result = schema.safeParse(data)
    if (result.success) {
      setErrors({})
      onValidationChange?.(true, {})
      return true
    } else {
      const newErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.')
        newErrors[path] = issue.message
      })
      setErrors(newErrors)
      onValidationChange?.(false, newErrors)
      return false
    }
  }, [schema, data, onValidationChange])

  React.useEffect(() => {
    if (validateOnChange) {
      validate()
    }
  }, [data, validateOnChange, validate])

  return (
    <SchemaForm
      configID={configID}
      domainID={domainID}
      schema={schema}
      data={data}
      onChange={onChange}
      onAttachmentsChange={onAttachmentsChange}
      errors={errors}
      shouldHideField={shouldHideField}
      renderHorizontal={renderHorizontal}
      displayGroups={displayGroups}
    />
  )
}
