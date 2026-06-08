import React, { useState } from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import {
  buttonMenuItemSchema,
  buttonCustomTabSchema,
  buttonExternalLinkSchema,
} from '@domain/schemas'
import { zodToFormMetadata } from '@spacedock/data-validation'
import { SchemaFormField } from '../SchemaFormField'
import type { DomainUI } from '@spacedock/manifest'

type ButtonType = 'menu-item' | 'custom-tab' | 'external-link'

interface ButtonBase {
  sub_type: ButtonType
  buttonVariant: string
}

interface MenuItemButton extends ButtonBase {
  sub_type: 'menu-item'
  functionID?: number
}

interface CustomTabButton extends ButtonBase {
  sub_type: 'custom-tab'
  traitID?: number
}

interface ExternalLinkButton extends ButtonBase {
  sub_type: 'external-link'
  url: string
}

type ButtonData = MenuItemButton | CustomTabButton | ExternalLinkButton

interface ButtonsListProps {
  configID: string
  domainID?: number
  value: ButtonData[]
  onChange: (value: ButtonData[]) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
    lastModifiedOfstDate?: string,
  ) => void
}

const BUTTON_TYPE_LABELS: Record<ButtonType, string> = {
  'menu-item': 'Menu Item',
  'custom-tab': 'Custom Tab',
  'external-link': 'External Link',
}

const BUTTON_SCHEMAS = {
  'menu-item': buttonMenuItemSchema,
  'custom-tab': buttonCustomTabSchema,
  'external-link': buttonExternalLinkSchema,
}

export const ButtonsList = ({
  configID,
  domainID,
  value = [],
  onChange,
  onAttachmentsChange,
}: ButtonsListProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  const handleAddButton = (type: ButtonType) => {
    let newButton: ButtonData

    if (type === 'menu-item') {
      newButton = {
        sub_type: 'menu-item',
        buttonVariant: 'primary',
        functionID: undefined,
      }
    } else if (type === 'custom-tab') {
      newButton = {
        sub_type: 'custom-tab',
        buttonVariant: 'primary',
        traitID: undefined,
      }
    } else {
      newButton = {
        sub_type: 'external-link',
        buttonVariant: 'primary',
        url: '',
      }
    }

    onChange([...value, newButton])
    setShowAddMenu(false)
  }

  const handleRemoveButton = (index: number) => {
    const newButtons = value.filter((_, i) => i !== index)
    onChange(newButtons)
  }

  const handleButtonChange = (index: number, updatedButton: ButtonData) => {
    const newButtons = [...value]
    newButtons[index] = updatedButton
    onChange(newButtons)
  }

  const getButtonTypeLabel = (button: ButtonData): string => {
    const subType = button.sub_type
    return BUTTON_TYPE_LABELS[subType] || 'Unknown'
  }

  const getButtonSchema = (button: ButtonData) => {
    const subType = button.sub_type
    return BUTTON_SCHEMAS[subType]
  }

  return (
    <div className="space-y-2">
      {/* List of buttons */}
      {value.map((button, index) => {
        const schema = getButtonSchema(button)
        if (!schema) return null

        const fields = zodToFormMetadata(schema).fields

        return (
          <div
            key={index}
            className="border-grayscale-600 bg-grayscale-850 rounded-md border p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <TextBody className="text-xs font-medium text-white">
                {getButtonTypeLabel(button)}
              </TextBody>
              <Button
                variant="ghost"
                size="tiny"
                onClick={() => handleRemoveButton(index)}
                title="Remove button"
              >
                <Icon icon="close" className="h-3 w-3" />
              </Button>
            </div>

            {/* Render form fields for this button */}
            <div className="space-y-2">
              {Object.entries(fields)
                .filter(([key]) => key !== 'sub_type') // Hide sub_type field
                .map(([key, field]) => (
                  <SchemaFormField
                    key={key}
                    configID={configID}
                    domainID={domainID}
                    field={field}
                    fieldKey={key}
                    value={(button as unknown as Record<string, unknown>)[key]}
                    onAttachmentsChange={onAttachmentsChange}
                    onChange={(newValue) => {
                      handleButtonChange(index, {
                        ...button,
                        [key]: newValue,
                      } as ButtonData)
                    }}
                  />
                ))}
            </div>
          </div>
        )
      })}

      {/* Add button control */}
      <div className="relative">
        {!showAddMenu ? (
          <Button
            variant="outline"
            size="small"
            onClick={() => setShowAddMenu(true)}
            className="w-full"
          >
            <Icon icon="plus" className="h-4 w-4" />
            <span className="ml-1">Add Button</span>
          </Button>
        ) : (
          <div className="bg-grayscale-800 border-grayscale-600 rounded-md border p-2">
            <TextBody className="text-grayscale-300 mb-2 text-xs">
              Select button type:
            </TextBody>
            <div className="space-y-1">
              {(Object.keys(BUTTON_TYPE_LABELS) as ButtonType[]).map((type) => (
                <Button
                  key={type}
                  variant="ghost-primary"
                  size="small"
                  onClick={() => handleAddButton(type)}
                  className="w-full justify-start"
                >
                  {BUTTON_TYPE_LABELS[type]}
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
    </div>
  )
}
