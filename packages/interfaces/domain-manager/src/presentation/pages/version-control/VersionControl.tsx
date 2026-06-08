import { noop } from 'lodash'
import { useState } from 'react'
import {
  ComboBox,
  SkeletonContainer,
  SkeletonText,
  Surface,
  TextBody,
  TextHeading,
  useToast,
} from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import type { DomainUI, TytoData } from '@spacedock/manifest'

import { ColorSchemePicker } from '../../molecules/color-scheme-picker'
import { MenuTypePicker } from '../../molecules/menu-type-picker'
import { VersionControlTable } from '../../organisms/versionControlTable/VersionControlTable'
import { DomainManagerConfigDialog } from '../../organisms/domainManagerConfigDialog/DomainManagerConfigDialog'
import { HomePreviewDialog } from '../../organisms/homePreviewDialog/HomePreviewDialog'
import { MenuPreviewDialog } from '../../organisms/menuPreviewDialog/MenuPreviewDialog'

type VersionControlPage =
  | 'tryyb'
  | 'menu'
  | 'mastery'
  | 'images'
  | 'custom-names'
  | 'r3'
  | 'services'

const IS_PORTFOLIO_DEMO = import.meta.env.VITE_DOMAIN_MANAGER_DEMO === 'true'

function pageSectionLabel(page: VersionControlPage): string {
  if (IS_PORTFOLIO_DEMO && page === 'tryyb') return 'HOME'
  return page.toUpperCase()
}

function pageSectionLabelClassName(page: VersionControlPage): string {
  if (IS_PORTFOLIO_DEMO && page === 'tryyb') return 'text-primary mr-2'
  return 'text-primary mr-2 capitalize'
}

interface VersionControlProps {
  isLoading: boolean
  liveData: any[]
  otherData: any[]
  contextID: number
  page: VersionControlPage
  canEdit: boolean
  refetch: () => void
  startVersion?: string
  themeStyles?: string
  activeConfigs?: DomainUI.ListUIConfiguration[]
  disabledConfigs?: DomainUI.ListUIConfiguration[]
  draftConfigs?: DomainUI.ListUIConfiguration[]
  onDeleteConfig: (configID: string) => void
  onStartVersionChange?: (value: string) => void
  onThemeStylesChange?: (value: string) => void
  colorSchemes?: TytoData.DomainProperties['colorSchemes']
  onColorSchemesChange?: (
    value: TytoData.DomainProperties['colorSchemes'],
  ) => void
  menuType?: TytoData.DomainProperties['menuType']
  onMenuTypeChange?: (value: TytoData.DomainProperties['menuType']) => void
}

export const VersionControl = ({
  isLoading,
  liveData,
  activeConfigs,
  disabledConfigs,
  draftConfigs,
  contextID,
  page,
  canEdit,
  refetch,
  startVersion,
  themeStyles,
  onDeleteConfig,
  onStartVersionChange,
  onThemeStylesChange,
  colorSchemes,
  onColorSchemesChange,
  menuType,
  onMenuTypeChange,
}: VersionControlProps) => {
  const toast = useToast()
  const [domainConfigDialog, setDomainConfigDialog] = useState<boolean>(false)
  const [previewState, setPreviewState] = useState<{
    open: boolean
    configGUID: string
    configName: string
    deviceMode: 'desktop' | 'tablet' | 'mobile'
  }>({ open: false, configGUID: '', configName: '', deviceMode: 'desktop' })

  const handlePreview = (
    configGUID: string,
    configName: string,
    deviceMode: 'desktop' | 'tablet' | 'mobile',
  ) => {
    setPreviewState({ open: true, configGUID, configName, deviceMode })
  }

  const startVersionOptions = [
    { value: 'Legacy', item: 'Legacy' },
    {
      value: 'Home',
      item: IS_PORTFOLIO_DEMO ? 'HOME' : 'Home',
    },
  ]
  //TODO This represents a way to set the overall active theme, predicated on the idea of changing the whole set.
  const themeStyleOptions = [
    { value: 'Red/Black (CV)', item: 'Red/Black (CV)' },
    { value: 'Teal (Onpoint)', item: 'Teal (Onpoint)' },
    {
      value: 'Orange/Black (Tryyb)',
      item: IS_PORTFOLIO_DEMO ? 'Orange/Black' : 'Orange/Black (Tryyb)',
    },
    { value: 'Custom from Theme Page', item: 'Custom from Theme Page' },
  ]

  if (isLoading) {
    return (
      <div className="bg-grayscale-800 bg-site-bg mt-2 flex flex-col gap-10 gap-6 rounded-xl p-12 opacity-30">
        <div className="flex max-w-2xl flex-col gap-4">
          <SkeletonText size="5xl" length="long" />
          {/* Version Control title */}
          <SkeletonText size="xs" length="xlong" className="opacity-30" />
          <SkeletonText size="xs" length="xlong" className="opacity-30" />
          <SkeletonText size="xs" length="xlong" className="opacity-30" />
          {/* description */}
        </div>

        {/* Live Versions Skeleton */}
        <div className="flex flex-col gap-4">
          <SkeletonText size="4xl" length="long" />
          {/* Live Versions heading */}
          <div className="bg-grayscale-700 w-full rounded-md p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonContainer
                key={i}
                width="100%"
                className="bg-muted mb-2 h-10 rounded-md "
              />
            ))}
          </div>
        </div>

        {/* Other Versions Skeleton */}
        <div className="flex flex-col gap-4">
          <SkeletonText size="4xl" length="long" />
          {/* Other Versions heading */}
          <div className="bg-grayscale-700 w-full rounded-md p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonContainer
                key={i}
                width="100%"
                className="mb-2 h-10 rounded-md "
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Surface className="bg-site-bg flex h-full w-full flex-col py-10 pl-0 pr-0 lg:px-10 lg:pl-10">
      {/* Sticky header */}

      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto pr-4"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#525252 #262626',
        }}
      >
        {(page === 'tryyb' || page === 'menu') && (
          <div className="mb-8 flex w-full flex-col gap-4 pr-2">
            <TextHeading size={3}>
              <span className={pageSectionLabelClassName(page)}>
                {pageSectionLabel(page)}
              </span>
              General
            </TextHeading>
            {page === 'tryyb' && (
              <div className="bg-grayscale-800 w-full rounded-md p-4">
                <div className="bg-bg-contrast-medium rounded-md p-4">
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="order-1 flex flex-1 flex-col gap-2 lg:order-1">
                      <TextBody className="text-site-fg font-semibold">
                        Start Version
                      </TextBody>
                      <ComboBox
                        items={startVersionOptions}
                        value={startVersion || ''}
                        onChange={(value) => {
                          onStartVersionChange?.(value)
                        }}
                      />
                    </div>
                    <div className="order-3 flex flex-1 flex-col gap-2 lg:order-2">
                      <TextBody className="text-site-fg font-semibold">
                        Active Theme
                      </TextBody>
                      <ComboBox
                        disabled
                        items={themeStyleOptions}
                        value={themeStyles || ''}
                        onChange={(value) => {
                          onThemeStylesChange?.(value)
                        }}
                      />
                    </div>
                    <div className="order-2 flex flex-1 flex-col gap-2 lg:order-3">
                      <TextBody className="text-site-fg font-semibold">
                        Color Scheme
                      </TextBody>
                      {colorSchemes !== undefined && onColorSchemesChange ? (
                        <ColorSchemePicker
                          value={colorSchemes}
                          onChange={onColorSchemesChange}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {page === 'menu' && (
              <div className="bg-grayscale-800 w-full rounded-md p-4">
                <div className="bg-bg-contrast-medium rounded-md p-4">
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="order-1 flex flex-1 flex-col gap-2 lg:order-1">
                      <TextBody className="text-site-fg font-semibold">
                        Menu Type
                      </TextBody>
                      {menuType !== undefined && onMenuTypeChange ? (
                        <MenuTypePicker
                          value={menuType}
                          onChange={onMenuTypeChange}
                        />
                      ) : null}
                    </div>
                    <div className="order-2 flex flex-1 flex-col gap-2 lg:order-2">
                      <TextBody className="text-site-fg font-semibold">
                        Active Theme
                      </TextBody>
                      <ComboBox
                        disabled
                        items={themeStyleOptions}
                        value={themeStyles || ''}
                        onChange={(value) => {
                          onThemeStylesChange?.(value)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mb-8 flex w-full flex-col gap-3 pr-2">
          <TextHeading size={3}>
            <span className={pageSectionLabelClassName(page)}>
              {pageSectionLabel(page)}
            </span>
            Version Control
          </TextHeading>
          {page === 'tryyb' ? (
            <span className="opacity-3 text-grayscale-500 text-sm">
              Control which versions of the start page configuration are live.
              You can also manage other versions before promoting them to
              preview or live status. These changes determine what end users see
              on their homepage.
            </span>
          ) : page === 'menu' ? (
            <span className="opacity-3 text-grayscale-500 text-sm">
              Control which versions of the top menu configuration are live. You
              can also manage other versions before promoting them to preview or
              live status. These changes determine what top menu options end
              users see.
            </span>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-4 pr-2">
          <TextHeading size={4}>Live Versions</TextHeading>
          <div className="bg-grayscale-800 w-full rounded-md p-4">
            <VersionControlTable
              isLoading={isLoading}
              canEdit={canEdit}
              data={activeConfigs ?? []}
              version={'live'}
              page={page}
              refetch={refetch}
              onDelete={noop}
              onPreview={page === 'tryyb' || page === 'menu' ? handlePreview : undefined}
              menuType={menuType}
            />
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-4 pr-2">
          <div className="flex items-center gap-4">
            <TextHeading size={4}>Other Versions</TextHeading>
            <Button
              variant="primary"
              onClick={() => {
                setDomainConfigDialog(!domainConfigDialog)
              }}
            >
              + New Layout
            </Button>

            <DomainManagerConfigDialog
              domainID={contextID || 0}
              id={contextID || 0}
              open={domainConfigDialog}
              onOpenChange={setDomainConfigDialog}
              page={page}
              onSuccess={() => {
                toast.toastSuccess({ description: 'domain config success' })
                refetch()
                setDomainConfigDialog(false)
              }}
            />
          </div>
          <div className="bg-grayscale-800 w-full rounded-md p-4">
            <VersionControlTable
              isLoading={isLoading}
              canEdit={canEdit}
              canDelete={canEdit}
              data={[...(draftConfigs ?? []), ...(disabledConfigs ?? [])].sort(
                (a, b) => {
                  const dateA = new Date(a.modifiedDate || 0).getTime()
                  const dateB = new Date(b.modifiedDate || 0).getTime()
                  return dateB - dateA
                },
              )}
              page={page}
              version={'history'}
              refetch={refetch}
              onDelete={onDeleteConfig}
              onPreview={page === 'tryyb' || page === 'menu' ? handlePreview : undefined}
              menuType={menuType}
            />
          </div>
        </div>
      </div>

      {page === 'tryyb' && (
        <HomePreviewDialog
          open={previewState.open}
          onOpenChange={(open) =>
            setPreviewState((prev) => ({ ...prev, open }))
          }
          configGUID={previewState.configGUID}
          configName={previewState.configName}
          deviceMode={previewState.deviceMode}
          onDeviceModeChange={(deviceMode) =>
            setPreviewState((prev) => ({ ...prev, deviceMode }))
          }
        />
      )}
      {page === 'menu' && (
        <MenuPreviewDialog
          open={previewState.open}
          onOpenChange={(open) =>
            setPreviewState((prev) => ({ ...prev, open }))
          }
          configGUID={previewState.configGUID}
          configName={previewState.configName}
          deviceMode={previewState.deviceMode}
          onDeviceModeChange={(deviceMode) =>
            setPreviewState((prev) => ({ ...prev, deviceMode }))
          }
          domainID={contextID}
        />
      )}
    </Surface>
  )
}
