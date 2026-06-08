import React, { useState } from 'react'
import { TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import {
  menuItemBannerSchema,
  customTabBannerSchema,
  externalLinkBannerSchema,
  lessonBannerSchema,
  type BannerItem,
  type MenuItemBanner,
  type CustomTabBanner,
  type ExternalLinkBanner,
  type LessonBanner,
} from '@domain/schemas'
import { zodToFormMetadata } from '@spacedock/data-validation'
import type { DomainUI } from '@spacedock/manifest'

import { SchemaFormField } from '../SchemaFormField'

type BannerType = 'menu-item' | 'custom-tab' | 'external-link' | 'lesson'

interface BannersListProps {
  configID: string
  domainID?: number
  value: BannerItem[]
  onChange: (value: BannerItem[]) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
  ) => void
  renderHorizontal?: boolean
}

const BANNER_TYPE_LABELS: Record<BannerType, string> = {
  'menu-item': 'Menu Item',
  'custom-tab': 'Custom Tab',
  'external-link': 'External Link',
  'lesson': 'Lesson',
}

const BANNER_SCHEMAS = {
  'menu-item': menuItemBannerSchema,
  'custom-tab': customTabBannerSchema,
  'external-link': externalLinkBannerSchema,
  'lesson': lessonBannerSchema,
}

export const BannersList = ({
  configID,
  domainID,
  value = [],
  onChange,
  onAttachmentsChange,
  renderHorizontal = false,
}: BannersListProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  const handleAddBanner = (type: BannerType) => {
    let newBanner: BannerItem

    if (type === 'menu-item') {
      newBanner = {
        sub_type: 'menu-item',
        imageID: 0,
        urlName: '',
        interactionType: 'banner',
        target: '_blank',
        functionID: undefined,
      } as MenuItemBanner
    } else if (type === 'custom-tab') {
      newBanner = {
        sub_type: 'custom-tab',
        imageID: 0,
        urlName: '',
        interactionType: 'banner',
        target: '_blank',
        traitID: undefined,
      } as CustomTabBanner
    } else if (type === 'lesson') {
      newBanner = {
        sub_type: 'lesson',
        imageID: 0,
        urlName: '',
        interactionType: 'banner',
        target: '_blank',
        lessonID: undefined,
      } as LessonBanner
    } else {
      newBanner = {
        sub_type: 'external-link',
        imageID: 0,
        urlName: '',
        url: '',
        interactionType: 'banner',
        target: '_blank',
      } as ExternalLinkBanner
    }

    onChange([...value, newBanner])
    setShowAddMenu(false)
  }

  const handleRemoveBanner = (index: number) => {
    const newBanners = value.filter((_, i) => i !== index)
    onChange(newBanners)
  }

  const handleBannerChange = (index: number, updatedBanner: BannerItem) => {
    const newBanners = [...value]
    newBanners[index] = updatedBanner
    onChange(newBanners)
  }

  const getBannerTypeLabel = (banner: BannerItem): string => {
    return BANNER_TYPE_LABELS[banner.sub_type] || 'Unknown'
  }

  const getBannerSchema = (banner: BannerItem) => {
    return BANNER_SCHEMAS[banner.sub_type]
  }

  return (
    <div className={renderHorizontal ? 'flex gap-3 overflow-x-auto' : 'space-y-2'}>
      {/* List of banners */}
      {value.map((banner, index) => {
        const schema = getBannerSchema(banner)
        if (!schema) return null

        const fields = zodToFormMetadata(schema).fields

        return (
          <div
            key={index}
            className={`border-grayscale-600 bg-grayscale-850 rounded-md border p-3 ${renderHorizontal ? 'min-w-[300px] flex-shrink-0' : ''}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <TextBody className="text-xs font-medium text-white">
                Banner {index + 1} - {getBannerTypeLabel(banner)}
              </TextBody>
              <Button
                variant="ghost"
                size="tiny"
                onClick={() => handleRemoveBanner(index)}
                title="Remove banner"
              >
                <Icon icon="close" className="h-3 w-3" />
              </Button>
            </div>

            {/* Render form fields for this banner */}
            <div className="space-y-2">
              {Object.entries(fields)
                .filter(([key]) => {
                  // Hide sub_type field
                  if (key === 'sub_type') return false
                  // Hide buttonLabel if interactionType is not 'button'
                  if (key === 'buttonLabel') {
                    return banner.interactionType === 'button'
                  }
                  return true
                })
                .map(([key, field]) => (
                  <SchemaFormField
                    key={key}
                    configID={configID}
                    domainID={domainID}
                    field={field}
                    fieldKey={key}
                    value={(banner as unknown as Record<string, unknown>)[key]}
                    onChange={(newValue) => {
                      handleBannerChange(index, {
                        ...banner,
                        [key]: newValue,
                      } as BannerItem)
                    }}
                    onAttachmentsChange={onAttachmentsChange}
                  />
                ))}
            </div>
          </div>
        )
      })}

      {/* Add banner control */}
      <div className={`relative ${renderHorizontal ? 'min-w-[200px] flex-shrink-0' : ''}`}>
        {!showAddMenu ? (
          <Button
            variant="outline"
            size="small"
            onClick={() => setShowAddMenu(true)}
            className="w-full"
          >
            <Icon icon="plus" className="h-4 w-4" />
            <span className="ml-1">Add Banner</span>
          </Button>
        ) : (
          <div className="bg-grayscale-800 border-grayscale-600 rounded-md border p-2">
            <TextBody className="text-grayscale-300 mb-2 flex flex-row items-center text-xs font-semibold">
              <Icon size="base" icon="image" className="mr-1 h-4 w-4" />
              Add Banner:
            </TextBody>
            <div className="space-y-1">
              {(Object.keys(BANNER_TYPE_LABELS) as BannerType[]).map((type) => (
                <Button
                  key={type}
                  variant="ghost-primary"
                  size="small"
                  onClick={() => handleAddBanner(type)}
                  className="w-full justify-start pl-4"
                >
                  {BANNER_TYPE_LABELS[type]}
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
