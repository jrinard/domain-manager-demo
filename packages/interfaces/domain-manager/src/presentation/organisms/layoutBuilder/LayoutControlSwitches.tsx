import React, { useState } from 'react'
import { Icon } from '@falcon/icons'
import {
  ToggleGroup,
  Switch,
  ComboButton,
  ComboButtonMain,
  ComboButtonMenu,
  ComboButtonMenuItem,
} from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import type { ScreenSizeLayout, HomeConfig } from '@domain/configs'
import type { DomainUI } from '@spacedock/manifest'

import { LayoutBackground } from './LayoutBackground'
import { PublishConfigDialog } from '../publishConfigDialog'

interface LayoutControlSwitchesProps {
  domainID?: number
  activeStatus?: DomainUI.UIConfigActiveStatus
  previewModeDark: boolean
  setPreviewModeDark: (value: boolean) => void
  setDevicePreview: (device: 'desktop' | 'tablet' | 'mobile') => void
  activeLayout: 'desktop' | 'tablet' | 'mobile'
  viewMode: 'edit' | 'preview'
  setViewMode: (value: 'edit' | 'preview') => void
  verticalAlignment: 'top' | 'center'
  setVerticalAlignment: (value: 'top' | 'center') => void
  currentLayout?: ScreenSizeLayout
  updateLayout: (layout: ScreenSizeLayout) => void
  config: HomeConfig
  mergeConfig: (config: Partial<HomeConfig>) => void
  onClone: () => void
  onPublish: () => void
  onSave: () => void
  isSavingConfig: boolean
  configType?: 'tryyb' | 'mastery'
}

export const LayoutControlSwitches = ({
  domainID,
  activeStatus,
  activeLayout,
  previewModeDark,
  setPreviewModeDark,
  setDevicePreview,
  viewMode,
  setViewMode,
  verticalAlignment,
  setVerticalAlignment,
  currentLayout,
  updateLayout,
  config,
  mergeConfig,
  onPublish,
  onClone,
  onSave,
  isSavingConfig,
  configType = 'tryyb',
}: LayoutControlSwitchesProps) => {
  const [backgroundDialogOpen, setBackgroundDialogOpen] = useState(false)
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  const isCloneAsDraftMode =
    activeStatus === 'ocENABLED' || activeStatus === 'ocDISABLED'

  return (
    <>
      <div
        className="mb-2 flex min-h-[40px] w-full flex-wrap items-center justify-between gap-2 px-2 lg:h-[40px]"
        data-id="layout-control-strip"
      >
        {/* Left side controls - Edit/Preview and Light/Dark */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Edit / Preview mode toggle - Show "Edit Mode" for mastery */}
          {configType === 'mastery' ? (
            <div className="inline-flex h-[42px] items-center gap-2 rounded-lg border border-neutral-700 bg-black px-3 py-1.5 text-sm">
              <span className="text-white">Edit Mode</span>
            </div>
          ) : (
            <div
              className={`inline-flex h-[42px] gap-2 rounded-lg border border-neutral-700 bg-black p-1.5 text-sm ${
                isCloneAsDraftMode ? 'pointer-events-none opacity-20' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`title-case text-sm ${
                    viewMode === 'edit' ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  Edit
                </span>
                <Switch
                  className="px-2"
                  disabled={isCloneAsDraftMode}
                  checked={viewMode === 'preview'}
                  onCheckedChange={() => {
                    setViewMode(viewMode === 'edit' ? 'preview' : 'edit')
                  }}
                />
                <span
                  className={`title-case text-sm ${
                    viewMode === 'preview' ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  Preview
                </span>
              </div>
            </div>
          )}

          {/* Dark / Light buttons */}
          <div className="inline-flex h-[42px] gap-2 rounded-lg border border-neutral-700 bg-black p-1.5 text-sm opacity-20">
            <div className="flex items-center gap-2">
              <span
                className={`title-case text-sm ${
                  !previewModeDark ? 'text-white' : 'text-neutral-400'
                }`}
              >
                Light
              </span>
              <Switch
                className="px-2"
                disabled
                checked={previewModeDark}
                onCheckedChange={() => {
                  setPreviewModeDark(!previewModeDark)
                }}
              />
              <span
                className={`title-case text-sm ${
                  previewModeDark ? 'text-white' : 'text-neutral-400'
                }`}
              >
                Dark
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeStatus === 'ocDRAFT' && (
            <ComboButton
              variant="primary"
              size="text"
              disabled={isSavingConfig}
            >
              <ComboButtonMain onClick={onSave}>Save Changes</ComboButtonMain>
              <ComboButtonMenu icon="chevron-down">
                <ComboButtonMenuItem icon="content-save" onClick={onSave}>
                  Save Changes
                </ComboButtonMenuItem>
                <ComboButtonMenuItem
                  icon="publish"
                  onClick={() => setShowPublishDialog(true)}
                >
                  Publish
                </ComboButtonMenuItem>
              </ComboButtonMenu>
            </ComboButton>
          )}

          {(activeStatus === 'ocENABLED' || activeStatus === 'ocDISABLED') && (
            <Button
              variant="fill"
              size="small"
              className="min-w-28"
              disabled={isSavingConfig}
              onClick={onClone}
            >
              Clone as Draft
            </Button>
          )}
        </div>

        {/* Right side controls - Device Preview, Alignment, and Image button grouped together */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Preview buttons */}
          <ToggleGroup
            variant="shadow"
            onChange={(value) => {
              if (!value) {
                value = 'desktop'
              }
              setDevicePreview(value as 'desktop' | 'tablet' | 'mobile')
            }}
            options={[
              {
                value: 'desktop',
                label: (
                  <Icon color="current" icon="desktop-windows" size="lg" />
                ),
              },
              {
                value: 'tablet',
                label: <Icon color="current" icon="tablet" size="lg" />,
              },
              {
                value: 'mobile',
                label: <Icon color="current" icon="mobile-phone" size="lg" />,
              },
            ]}
          />

          {/* Vertical Alignment buttons */}
          <div
            className={
              isCloneAsDraftMode ? 'pointer-events-none opacity-20' : ''
            }
          >
            <ToggleGroup
              variant="shadow"
              value={verticalAlignment}
              onChange={(value) => {
                // Always have one selected - if trying to deselect, keep current
                if (value === 'top' || value === 'center') {
                  setVerticalAlignment(value)
                }
                // If value is undefined (deselect attempt), do nothing - keep current state
              }}
              options={[
                {
                  value: 'top',
                  label: (
                    <Icon color="current" icon="format-align-top" size="lg" />
                  ),
                  ariaLabel: 'Align top',
                  disabled: verticalAlignment === 'top' || isCloneAsDraftMode,
                },
                    {
                      value: 'center',
                      label: (
                        <Icon
                          color="current"
                          icon="format-align-center"
                          size="lg"
                        />
                      ),
                      ariaLabel: 'Align center',
                      disabled:
                        verticalAlignment === 'center' || isCloneAsDraftMode,
                    },
              ]}
            />
          </div>

          {/* Background Image button */}
          <button
            onClick={() => setBackgroundDialogOpen(true)}
            disabled={isCloneAsDraftMode}
            className={`hover:bg-grayscale-800 inline-flex h-[42px] items-center gap-3 rounded-lg border border-neutral-700 bg-black px-2 text-sm transition-colors ${
              isCloneAsDraftMode ? 'pointer-events-none opacity-20' : ''
            }`}
            title="Set background image"
          >
            <Icon color="current" icon="image" size="2xl" />
          </button>
        </div>
      </div>

      <PublishConfigDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        onConfirm={onPublish}
      />

      <LayoutBackground
        domainID={domainID}
        open={backgroundDialogOpen}
        onOpenChange={setBackgroundDialogOpen}
        currentLayout={currentLayout}
        updateLayout={updateLayout}
        config={config}
        mergeConfig={mergeConfig}
      />
    </>
  )
}
