import { keyBy } from 'lodash'
import React, { useMemo } from 'react'
import {
  ComboBox,
  TextBody,
  Switch,
  ToggleGroup,
  Dialog,
  DialogTrigger,
} from '@spacedock/falcon-ui'
import { TextEditor, PluginPresets } from '@spacedock/md-wysiwyg'
import { Icon } from '@falcon/icons'
import { Button } from '@falcon/buttons'
import type { FieldMetadata } from '@spacedock/data-validation'
import { MENU_ITEMS } from '@spacedock/manifest'
import { useCustomTabsReadQuery, useMenuQuery } from '@tyto/query'
import type { DomainUI } from '@spacedock/manifest'

import { createFileURL } from '../../../data/utils/file-path'
import { ArrayOfNumbersInput } from './Inputs/ArrayOfNumbersInput'
import { AttachmentPicker } from './Inputs/AttachmentPicker'
import { BannersList } from './Inputs/BannersList'
import { ButtonsList } from './Inputs/ButtonsList'
import { ActionPicker } from './Inputs/ActionPicker'
import { ItemsList } from './Inputs/ItemsList'
import { NewsCategoryPicker } from './Inputs/NewsCategoryPicker'

// Small component so we can use hooks for the modal editor without violating rules-of-hooks
const MdWysiwygField: React.FC<{
  mdValue: string
  onSave: (md: string) => void
  label: string
  sectionId?: string
}> = ({ mdValue, onSave, label, sectionId }) => {
  const [open, setOpen] = React.useState(false)
  const [localMd, setLocalMd] = React.useState<string>(mdValue)

  React.useEffect(() => {
    setLocalMd(mdValue)
  }, [mdValue])

  return (
    <div className="w-full">
      <Dialog
        title={label}
        closeLabel="Cancel"
        completeLabel="Save"
        action={{
          onClick: () => {
            onSave(localMd)
            try {
              window.dispatchEvent(
                new CustomEvent('spacedock:section-updated', {
                  detail: {
                    sectionId: sectionId,
                    sectionData: { content: localMd },
                  },
                }),
              )
            } catch (err) {
              void err
            }
            setOpen(false)
          },
        }}
        maxWidth="xl"
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (o) setLocalMd(mdValue)
        }}
      >
        <DialogTrigger asChild>
          <button
            className="bg-primary-600 rounded px-3 py-1 text-white"
            type="button"
          >
            Edit Text Content
          </button>
        </DialogTrigger>

        <div className="w-full">
          <TextEditor
            markdown={localMd}
            plugins={PluginPresets.TEXT_ONLY_PLUGINS}
            onChange={(md: string) => setLocalMd(md)}
          />
        </div>
      </Dialog>
    </div>
  )
}

interface SchemaFormFieldProps {
  configID: string
  domainID?: number
  sectionId?: string
  field: FieldMetadata
  fieldKey?: string
  value: any
  onChange: (value: any) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
  ) => void
  error?: string
  renderHorizontal?: boolean
}

export const SchemaFormField = ({
  configID,
  domainID,
  sectionId,
  field,
  fieldKey,
  value,
  onChange,
  onAttachmentsChange,
  error,
  renderHorizontal = false,
}: SchemaFormFieldProps) => {
  const menuQuery = useMenuQuery({
    disabled: field.inputType === 'menu-item-picker',
    // field.inputType === 'custom-tab-picker',
  })
  const customTabsQuery = useCustomTabsReadQuery({
    domainID: domainID ?? 0,
    isEnabled: !!domainID,
  })

  const keyedMenuItems = useMemo(() => {
    return keyBy(menuQuery.data?.menuItems, 'functionID')
  }, [menuQuery.data])

  const renderField = () => {
    // Special handling for banners field
    if (fieldKey === 'banners' && Array.isArray(value)) {
      return (
        <BannersList
          configID={configID}
          domainID={domainID}
          value={value || []}
          onChange={onChange}
          onAttachmentsChange={onAttachmentsChange}
          renderHorizontal={renderHorizontal}
        />
      )
    }

    // Handle based on inputType from form-adapter
    // Special-case: single action picker for welcome section's 'action' field
    if (fieldKey === 'action') {
      return (
        <ActionPicker
          configID={configID}
          domainID={domainID}
          value={value}
          onChange={(v) => onChange(v)}
          onAttachmentsChange={onAttachmentsChange}
        />
      )
    }
    switch (field.inputType) {
      case 'select': {
        const opts = field.options || []

        return (
          <select
            className="border-grayscale-600 bg-grayscale-800 w-full rounded border px-2 py-1 text-xs text-white"
            value={value ?? field.default ?? ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {opts.map((option) => {
              const optVal = typeof option === 'object' ? option.value : option
              const optLabel =
                typeof option === 'object'
                  ? option.label
                  : formatEnumValue(String(option))
              return (
                <option key={optVal} value={optVal}>
                  {optLabel}
                </option>
              )
            })}
          </select>
        )
      }

      case 'text': {
        // Special handling for logoOverridePathURL and iconOverridePathURL - normalize full URLs to relative paths
        const isPathOverride =
          fieldKey === 'logoOverridePathURL' ||
          fieldKey === 'iconOverridePathURL'
        const displayValue =
          isPathOverride && value
            ? extractRelativePath(value)
            : (value ?? field.default ?? '')

        return (
          <input
            type="text"
            className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 w-full rounded border px-2 py-1 text-xs text-white"
            value={displayValue}
            onChange={(e) => {
              const newValue = e.target.value
              // If this is a path override field, normalize the value (extract path from full URL)
              if (isPathOverride) {
                onChange(extractRelativePath(newValue))
              } else {
                onChange(newValue)
              }
            }}
            placeholder={
              field.placeholder || field.description || `Enter ${field.label}`
            }
          />
        )
      }

      case 'md-wysiwyg': {
        const mdValue = value ?? field.default ?? ''
        return (
          <MdWysiwygField
            mdValue={mdValue}
            onSave={(md) => onChange(md)}
            label={field.label}
            sectionId={sectionId}
          />
        )
      }

      case 'number':
        return (
          <input
            type="number"
            className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 w-full rounded border px-2 py-1 text-xs text-white"
            value={value ?? field.default ?? ''}
            onChange={(e) => {
              const num = parseFloat(e.target.value)
              onChange(isNaN(num) ? undefined : num)
            }}
            min={field.min}
            max={field.max}
            placeholder={field.description || `Enter ${field.label}`}
          />
        )

      case 'toggle-with-icons': {
        const checked = Boolean(value ?? field.default ?? false)
        return (
          <div className="flex items-center gap-2">
            <Icon
              icon="eye-outline"
              className={checked ? 'opacity-40' : 'opacity-90'}
            />
            <Switch
              checked={checked}
              onCheckedChange={(checked) => onChange(checked)}
              aria-label={field.label}
            />
            <Icon
              icon="eye-off-outline"
              className={checked ? 'opacity-90' : 'opacity-40'}
            />
          </div>
        )
      }

      case 'alignment-toggle': {
        const current = (value ?? field.default ?? 'left') as string
        const options = [
          {
            value: 'left',
            label: <Icon icon="format-align-left" />,
            ariaLabel: 'Align left',
          },
          {
            value: 'center',
            label: <Icon icon="format-align-center" />,
            ariaLabel: 'Align center',
          },
          {
            value: 'right',
            label: <Icon icon="format-align-right" />,
            ariaLabel: 'Align right',
          },
        ]

        return (
          <ToggleGroup
            options={options}
            value={current}
            onChange={(val) => onChange(val)}
            variant="shadow"
          />
        )
      }

      case 'checkbox':
        return (
          <label className="flex items-center text-xs text-white">
            <input
              type="checkbox"
              className="border-grayscale-600 bg-grayscale-800 mr-2 rounded"
              checked={value ?? field.default ?? false}
              onChange={(e) => onChange(e.target.checked)}
            />
            {field.description || field.label}
          </label>
        )

      case 'array-of-numbers':
        return <ArrayOfNumbersInput value={value} onChange={onChange} />

      case 'buttons-list':
        return (
          <ButtonsList
            configID={configID}
            domainID={domainID}
            value={value || []}
            onChange={onChange}
            onAttachmentsChange={onAttachmentsChange}
          />
        )

      case 'items-list':
        return (
          <ItemsList
            configID={configID}
            domainID={domainID}
            value={value || []}
            onAttachmentsChange={onAttachmentsChange}
            onChange={onChange}
          />
        )

      case 'banners-list':
        return (
          <BannersList
            configID={configID}
            domainID={domainID}
            value={value || []}
            onChange={onChange}
            onAttachmentsChange={onAttachmentsChange}
          />
        )

      case 'multi-select': {
        // Multi-select checkboxes for enum arrays
        const currentValues = Array.isArray(value) ? value : []
        return (
          <div className="space-y-1">
            {(field.options || []).map((option) => {
              const optVal = typeof option === 'object' ? option.value : option
              const optLabel =
                typeof option === 'object'
                  ? option.label
                  : formatEnumValue(String(option))
              return (
                <label
                  key={optVal}
                  className="flex items-center text-xs text-white"
                >
                  <input
                    type="checkbox"
                    className="border-grayscale-600 bg-grayscale-800 mr-2 rounded"
                    checked={currentValues.includes(optVal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...currentValues, optVal])
                      } else {
                        onChange(currentValues.filter((v: any) => v !== optVal))
                      }
                    }}
                  />
                  {optLabel}
                </label>
              )
            })}
          </div>
        )
      }
      case 'button-variant-picker':
        return (
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label={field.label}
          >
            {field.options?.map((option) => {
              const optVal = String((option as any).value ?? option)
              const selected = (value ?? field.default ?? '') === optVal
              return (
                <Button
                  key={optVal}
                  variant={optVal as any}
                  size="tiny"
                  title={formatEnumValue(optVal)}
                  aria-label={formatEnumValue(optVal)}
                  role="radio"
                  aria-checked={selected}
                  className={
                    (selected ? 'ring-2 ring-white ' : '') +
                    'border-grayscale-300 dark:border-grayscale-700 h-5 w-5 border p-0'
                  }
                  onClick={() => onChange(optVal)}
                />
              )
            })}
          </div>
        )

      case 'menu-item-picker':
        return (
          <ComboBox
            triggerClassName="w-full"
            includeSearch
            items={MENU_ITEMS.map((func) => ({
              value: func.functionID.toString(),
              item: (
                <div className="flex flex-row items-center gap-1">
                  {keyedMenuItems[func.functionID]?.iconPath ? (
                    <img
                      src={createFileURL(
                        keyedMenuItems[func.functionID]?.iconPath,
                      )}
                      alt={func.menuDisplayName || func.functionName}
                      className="h-4 w-4"
                    />
                  ) : (
                    <div className="h-4 w-4" />
                  )}{' '}
                  {func.menuDisplayName || func.functionName}
                </div>
              ),
              id: func.functionID,
            }))}
            value={value ?? field.default ?? ''}
            onChange={(value) => onChange(value)}
          />
        )
      case 'custom-tab-picker':
        return (
          <ComboBox
            triggerClassName="w-full"
            includeSearch
            items={
              customTabsQuery.data
                ? customTabsQuery.data.tabs.map((customTab) => ({
                    value: customTab.traitID.toString(),
                    item: (
                      <div className="flex flex-row items-center gap-1">
                        {customTab.iconUrl ? (
                          <img
                            src={fixedCustomTabIconPath(customTab.iconUrl)}
                            alt={customTab.name || customTab.traitID.toString()}
                            className="h-4 w-4"
                          />
                        ) : (
                          <div className="h-4 w-4" />
                        )}{' '}
                        {customTab.name || customTab.traitID}
                      </div>
                    ),
                    id: customTab.traitID,
                  }))
                : []
            }
            value={value ?? field.default ?? ''}
            onChange={(value) => onChange(value)}
          />
        )
      case 'news-category-picker':
        return (
          <NewsCategoryPicker
            domainID={domainID ?? 0}
            value={value ?? field.default ?? ''}
            onChange={(value) =>
              onChange(Number.isNaN(value) ? undefined : value)
            }
          />
        )
      case 'config-attachment-picker':
      case 'config-lesson-attachment-picker':
      case 'config-image-attachment-picker':
        return (
          <AttachmentPicker
            configID={configID}
            domainID={domainID}
            permitImages={
              field.inputType === 'config-attachment-picker' ||
              field.inputType === 'config-image-attachment-picker'
            }
            permitLessons={
              field.inputType === 'config-attachment-picker' ||
              field.inputType === 'config-lesson-attachment-picker'
            }
            value={value ?? field.default ?? ''}
            onChange={(value) =>
              onChange(Number.isNaN(value) ? undefined : value)
            }
            onAttachmentsChange={onAttachmentsChange}
          />
        )
      case 'team-picker':
      case 'person-picker':
      case 'curriculum-picker':
      case 'image-picker':
        // TODO: Implement smart pickers for these reference types
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="border-grayscale-600 bg-grayscale-800 placeholder-grayscale-400 w-full rounded border px-2 py-1 text-xs text-white"
              value={value ?? field.default ?? ''}
              onChange={(e) => {
                const num = parseInt(e.target.value)
                onChange(isNaN(num) ? undefined : num)
              }}
              placeholder={`Enter ${field.label} ID`}
            />
            <div className="text-xs text-gray-500">
              Smart picker coming in future update
            </div>
          </div>
        )

      default:
        return (
          <div className="text-xs text-gray-400">
            Unsupported input type: {field.inputType}
          </div>
        )
    }
  }

  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between">
        <TextBody className="text-grayscale-300 text-xs">
          {field.label}
          {field.required && <span className="ml-1 text-red-500">*</span>}
        </TextBody>
        {field.default !== undefined && !field.required && (
          <span className="text-grayscale-500 text-xs">
            Default: {String(field.default)}
          </span>
        )}
      </div>
      {renderField()}
      {error && <div className="mt-1 text-xs text-red-400">{error}</div>}
      {field.description && !error && (
        <div className="mt-1 text-xs text-gray-500">{field.description}</div>
      )}
    </div>
  )
}

function fixedCustomTabIconPath(iconPath: string): string {
  return createFileURL(iconPath)
}

/**
 * Extracts the relative path from a URL string.
 * If the input is a full URL (starts with http:// or https://), extracts the pathname.
 * If it's already a relative path, returns it as-is.
 */
function extractRelativePath(urlOrPath: string): string {
  if (!urlOrPath) {
    return ''
  }

  // Check if it's a full URL
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    try {
      const url = new URL(urlOrPath)
      return url.pathname + url.search + url.hash
    } catch {
      // If URL parsing fails, return as-is
      return urlOrPath
    }
  }

  // Already a relative path
  return urlOrPath
}

/**
 * Format enum values for display
 * e.g., "active-employees" → "Active Employees"
 */
function formatEnumValue(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
