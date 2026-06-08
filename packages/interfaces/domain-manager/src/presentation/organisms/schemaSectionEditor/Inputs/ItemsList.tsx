import React, { useState } from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import {
  buttonMenuItemSchema,
  buttonCustomTabSchema,
  buttonExternalLinkSchema,
  menuItemSchema,
  customTabSchema,
  externalLinkSchema,
} from '@domain/schemas'
import { zodToFormMetadata } from '@spacedock/data-validation'
import type { DomainUI } from '@spacedock/manifest'

import { SchemaFormField } from '../SchemaFormField'

type ItemType = 'menu-item' | 'custom-tab' | 'external-link'
type ItemCategory = 'button' | 'link'

interface ItemBase {
  sub_type: ItemType
}

interface ButtonItem extends ItemBase {
  buttonVariant: string
  textOverride?: string
}

interface LinkItem extends ItemBase {
  icon_display: string
  iconOverridePathURL?: string
}

interface MenuItemButton extends ButtonItem {
  sub_type: 'menu-item'
  functionID?: number
}

interface CustomTabButton extends ButtonItem {
  sub_type: 'custom-tab'
  traitID?: number
}

interface ExternalLinkButton extends ButtonItem {
  sub_type: 'external-link'
  url: string
}

interface MenuItemLink extends LinkItem {
  sub_type: 'menu-item'
  functionID?: number
}

interface CustomTabLink extends LinkItem {
  sub_type: 'custom-tab'
  traitID?: number
}

interface ExternalLinkLink extends LinkItem {
  sub_type: 'external-link'
  url: string
}

type ItemData =
  | MenuItemButton
  | CustomTabButton
  | ExternalLinkButton
  | MenuItemLink
  | CustomTabLink
  | ExternalLinkLink

interface ItemsListProps {
  configID: string
  domainID?: number
  value: ItemData[]
  onChange: (value: ItemData[]) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
  ) => void
}

const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  'menu-item': 'Menu Item',
  'custom-tab': 'Custom Tab',
  'external-link': 'External Link',
}

const BUTTON_SCHEMAS = {
  'menu-item': buttonMenuItemSchema,
  'custom-tab': buttonCustomTabSchema,
  'external-link': buttonExternalLinkSchema,
}

const LINK_SCHEMAS = {
  'menu-item': menuItemSchema,
  'custom-tab': customTabSchema,
  'external-link': externalLinkSchema,
}

export const ItemsList = ({
  configID,
  domainID,
  value = [],
  onChange,
  onAttachmentsChange,
}: ItemsListProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  const isButton = (item: ItemData): item is ButtonItem & ItemData => {
    return 'buttonVariant' in item
  }

  const handleAddItem = (category: ItemCategory, type: ItemType) => {
    let newItem: ItemData

    if (category === 'button') {
      if (type === 'menu-item') {
        newItem = {
          sub_type: 'menu-item',
          buttonVariant: 'primary',
          functionID: undefined,
        } as MenuItemButton
      } else if (type === 'custom-tab') {
        newItem = {
          sub_type: 'custom-tab',
          buttonVariant: 'primary',
          traitID: undefined,
        } as CustomTabButton
      } else {
        newItem = {
          sub_type: 'external-link',
          buttonVariant: 'primary',
          url: '',
        } as ExternalLinkButton
      }
    } else {
      // link category
      if (type === 'menu-item') {
        newItem = {
          sub_type: 'menu-item',
          icon_display: 'inline',
          functionID: undefined,
        } as MenuItemLink
      } else if (type === 'custom-tab') {
        newItem = {
          sub_type: 'custom-tab',
          icon_display: 'inline',
          traitID: undefined,
        } as CustomTabLink
      } else {
        newItem = {
          sub_type: 'external-link',
          icon_display: 'inline',
          url: '',
        } as ExternalLinkLink
      }
    }

    onChange([...value, newItem])
    setShowAddMenu(false)
  }

  const handleRemoveItem = (index: number) => {
    const newItems = value.filter((_, i) => i !== index)
    onChange(newItems)
  }

  const handleItemChange = (index: number, updatedItem: ItemData) => {
    const newItems = [...value]
    newItems[index] = updatedItem
    onChange(newItems)
  }

  const getItemTypeLabel = (item: ItemData): string => {
    const category = isButton(item) ? 'Button' : 'Link'
    const subType = item.sub_type
    return `${category} - ${ITEM_TYPE_LABELS[subType] || 'Unknown'}`
  }

  const getItemSchema = (item: ItemData) => {
    const subType = item.sub_type
    return isButton(item) ? BUTTON_SCHEMAS[subType] : LINK_SCHEMAS[subType]
  }

  return (
    <div className="space-y-2">
      {/* List of items */}
      {value.map((item, index) => {
        const schema = getItemSchema(item)
        if (!schema) return null

        const fields = zodToFormMetadata(schema).fields

        return (
          <div
            key={index}
            className="border-grayscale-600 bg-grayscale-850 rounded-md border p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <TextBody className="text-xs font-medium text-white">
                {getItemTypeLabel(item)}
              </TextBody>
              <Button
                variant="ghost"
                size="tiny"
                onClick={() => handleRemoveItem(index)}
                title="Remove item"
              >
                <Icon icon="close" className="h-3 w-3" />
              </Button>
            </div>

            {/* Render form fields for this item */}
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
                    value={(item as unknown as Record<string, unknown>)[key]}
                    onChange={(newValue) => {
                      handleItemChange(index, {
                        ...item,
                        [key]: newValue,
                      } as ItemData)
                    }}
                    onAttachmentsChange={onAttachmentsChange}
                  />
                ))}
            </div>
          </div>
        )
      })}

      {/* Add item control */}
      <div className="relative">
        {!showAddMenu ? (
          <Button
            variant="outline"
            size="small"
            onClick={() => setShowAddMenu(true)}
            className="w-full"
          >
            <Icon icon="plus" className="h-4 w-4" />
            <span className="ml-1">Add Item</span>
          </Button>
        ) : (
          <div className="bg-grayscale-800 border-grayscale-600 rounded-md border p-2">
            {/* Buttons Section */}
            <TextBody className="text-grayscale-300 mb-2 flex flex-row items-center text-xs font-semibold">
              <Icon size="base" icon="crop-square" className="mr-1 h-4 w-4" />{' '}
              Add Button:
            </TextBody>
            <div className="mb-3 space-y-1">
              {(Object.keys(ITEM_TYPE_LABELS) as ItemType[]).map((type) => (
                <Button
                  key={`button-${type}`}
                  variant="ghost-primary"
                  size="small"
                  onClick={() => handleAddItem('button', type)}
                  className="w-full justify-start pl-4"
                >
                  {/* <Icon icon="square-outline" className="mr-1 h-3 w-3" /> */}
                  {ITEM_TYPE_LABELS[type]}
                </Button>
              ))}
            </div>

            {/* Links Section */}
            <TextBody className="text-grayscale-300 mb-2 flex flex-row items-center text-xs font-semibold">
              <Icon size="base" icon="link-variant" className="mr-1 h-4 w-4" />
              Add Link:
            </TextBody>
            <div className="space-y-1">
              {(Object.keys(ITEM_TYPE_LABELS) as ItemType[]).map((type) => (
                <Button
                  key={`link-${type}`}
                  variant="ghost-primary"
                  size="small"
                  onClick={() => handleAddItem('link', type)}
                  className="w-full justify-start pl-4"
                >
                  {/* <Icon icon="link-variant" className="mr-1 h-3 w-3" /> */}
                  {ITEM_TYPE_LABELS[type]}
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
