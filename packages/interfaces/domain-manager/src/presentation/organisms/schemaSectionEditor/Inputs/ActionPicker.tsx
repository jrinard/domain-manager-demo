import React, { useState } from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import {
  menuItemSchema as linkMenuItemSchema,
  customTabSchema as linkCustomTabSchema,
  externalLinkSchema as linkExternalLinkSchema,
} from '@domain/schemas'
import { zodToFormMetadata } from '@spacedock/data-validation'
import { SchemaFormField } from '../SchemaFormField'
import type { DomainUI } from '@spacedock/manifest'

type ActionType = 'menu-item' | 'custom-tab' | 'external-link'

interface MenuItemAction {
  sub_type: 'menu-item'
  functionID?: number
}

interface CustomTabAction {
  sub_type: 'custom-tab'
  traitID?: number
}

interface ExternalLinkAction {
  sub_type: 'external-link'
  url?: string
}

type ActionData = MenuItemAction | CustomTabAction | ExternalLinkAction

interface ActionPickerProps {
  configID: string
  domainID?: number
  value?: ActionData
  onChange: (value?: ActionData) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
    lastModifiedOfstDate?: string,
  ) => void
}

const ACTION_LABELS: Record<ActionType, string> = {
  'menu-item': 'Menu Item',
  'custom-tab': 'Custom Tab',
  'external-link': 'External Link',
}

const ACTION_SCHEMAS = {
  'menu-item': linkMenuItemSchema,
  'custom-tab': linkCustomTabSchema,
  'external-link': linkExternalLinkSchema,
}

export const ActionPicker = ({
  configID,
  domainID,
  value,
  onChange,
  onAttachmentsChange,
}: ActionPickerProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  const handleAdd = (type: ActionType) => {
    let newAction: ActionData
    if (type === 'menu-item') {
      newAction = { sub_type: 'menu-item', functionID: undefined }
    } else if (type === 'custom-tab') {
      newAction = { sub_type: 'custom-tab', traitID: undefined }
    } else {
      newAction = { sub_type: 'external-link', url: '' }
    }
    onChange(newAction)
    setShowAddMenu(false)
  }

  const handleRemove = () => {
    onChange(undefined)
  }

  if (!value) {
    return (
      <div className="relative">
        {!showAddMenu ? (
          <Button
            variant="outline"
            size="small"
            onClick={() => setShowAddMenu(true)}
            className="w-full"
          >
            <Icon icon="plus" className="h-4 w-4" />
            <span className="ml-1">Add Action</span>
          </Button>
        ) : (
          <div className="bg-grayscale-800 border-grayscale-600 rounded-md border p-2">
            <TextBody className="text-grayscale-300 mb-2 text-xs">
              Select action type:
            </TextBody>
            <div className="space-y-1">
              {(Object.keys(ACTION_LABELS) as ActionType[]).map((type) => (
                <Button
                  key={type}
                  variant="ghost-primary"
                  size="small"
                  onClick={() => handleAdd(type)}
                  className="w-full justify-start"
                >
                  {ACTION_LABELS[type]}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="tiny"
              onClick={() => setShowAddMenu(false)}
              className="mt-2 w-full"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    )
  }

  const schema = (ACTION_SCHEMAS as any)[value.sub_type]
  const fields = zodToFormMetadata(schema).fields

  return (
    <div className="border-grayscale-600 bg-grayscale-850 rounded-md border p-3">
      <div className="mb-2 flex items-center justify-between">
        <TextBody className="text-xs font-medium text-white">
          {ACTION_LABELS[value.sub_type as ActionType]}
        </TextBody>
        <Button
          variant="ghost"
          size="tiny"
          onClick={handleRemove}
          title="Remove"
        >
          <Icon icon="close" className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        {Object.entries(fields)
          .filter(([key]) => key !== 'sub_type')
          .map(([key, field]) => (
            <SchemaFormField
              key={key}
              configID={configID}
              domainID={domainID}
              field={field}
              fieldKey={key}
              value={(value as unknown as Record<string, unknown>)[key]}
              onAttachmentsChange={onAttachmentsChange}
              onChange={(newValue) => {
                onChange({
                  ...(value as unknown as Record<string, unknown>),
                  [key]: newValue,
                } as ActionData)
              }}
            />
          ))}
      </div>
    </div>
  )
}

export default ActionPicker
