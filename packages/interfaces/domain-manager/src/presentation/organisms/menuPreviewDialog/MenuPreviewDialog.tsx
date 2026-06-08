/**
 * Dev note: TopV3 lives in `apps/tryyb` and is tied to Flux, session, routing,
 * and other app runtime. Pulling it into `@interfaces/domain-manager` would risk
 * circular dependencies and would require all of the tryyb runtime context. The menu shell
 * and dropdown UI are therefore duplicated as a lightweight simulation in
 * `MenuBuilderPreview` (showShell); this dialog only wires data and layout.
 */
import { useMemo } from 'react'
import { mergeClasses } from '@falcon/style'
import {
  Dialog,
  DialogFooter,
  IconButton,
  TextBody,
  TextHeading,
  ToggleGroup,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'

import { useTopMenuConfig } from '../../../data/hooks/useTopMenuConfig'
import { useKeyedDomainImages } from '../../../data/hooks/useKeyedDomainImages'
import { createFileURL } from '../../../data/utils/file-path'
import { MenuBuilderPreview } from '../menuBuilder/MenuBuilderPreview'

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

interface MenuPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  configGUID: string
  configName?: string
  deviceMode: DeviceMode
  onDeviceModeChange: (mode: DeviceMode) => void
  domainID?: number
}

const DEVICE_WIDTH_CLASS: Record<DeviceMode, string> = {
  desktop: 'max-w-full',
  tablet: 'max-w-[768px]',
  mobile: 'max-w-[375px]',
}

export const MenuPreviewDialog = ({
  open,
  onOpenChange,
  configGUID,
  configName,
  deviceMode,
  onDeviceModeChange,
  domainID,
}: MenuPreviewDialogProps) => {
  if (!open) return null

  return (
    <MenuPreviewDialogContent
      open={open}
      onOpenChange={onOpenChange}
      configGUID={configGUID}
      configName={configName}
      deviceMode={deviceMode}
      onDeviceModeChange={onDeviceModeChange}
      domainID={domainID}
    />
  )
}

const MenuPreviewDialogContent = ({
  open,
  onOpenChange,
  configGUID,
  configName,
  deviceMode,
  onDeviceModeChange,
  domainID,
}: MenuPreviewDialogProps) => {
  const {
    topMenuConfig,
    isPending,
    isError,
    data: remoteConfig,
  } = useTopMenuConfig({
    configID: configGUID,
  })

  const { keyedImages } = useKeyedDomainImages({ domainID: domainID ?? 0 })

  const { logoURL, previewTheme } = useMemo(() => {
    const appEl = document.getElementById('App')
    const isDark = appEl?.dataset.sitetheme === 'dark'

    const lightLogoPath = keyedImages?.logo_link?.pathURL
    const darkLogoPath = keyedImages?.logo_link_DARK?.pathURL

    const selectedPath = isDark
      ? (darkLogoPath || lightLogoPath)
      : (lightLogoPath || darkLogoPath)

    return {
      previewTheme: isDark ? ('dark' as const) : ('light' as const),
      logoURL: selectedPath ? createFileURL(selectedPath) : undefined,
    }
  }, [keyedImages])

  const libraryImages = remoteConfig?.libraryImages
  const libraryLessons = remoteConfig?.libraryLessons

  const deviceToggleOptions = [
    {
      value: 'desktop',
      label: (
        <IconButton
          hover="none"
          color={deviceMode === 'desktop' ? 'primary' : 'current'}
          icon="desktop-windows"
          size="lg"
          onClick={() => onDeviceModeChange('desktop')}
        />
      ),
    },
    {
      value: 'tablet',
      label: (
        <IconButton
          hover="none"
          color={deviceMode === 'tablet' ? 'primary' : 'current'}
          icon="tablet"
          size="lg"
          onClick={() => onDeviceModeChange('tablet')}
        />
      ),
    },
    {
      value: 'mobile',
      label: (
        <IconButton
          hover="none"
          color={deviceMode === 'mobile' ? 'primary' : 'current'}
          icon="mobile-phone"
          size="lg"
          onClick={() => onDeviceModeChange('mobile')}
        />
      ),
    },
  ]

  const dialogTitle = (
    <div className="flex flex-1 items-center gap-6">
      <div className="flex items-center gap-3">
        <span>Menu Preview</span>
        {configName && (
          <TextBody className="text-grayscale-400 text-sm font-normal normal-case">
            — {configName}
          </TextBody>
        )}
      </div>
      <ToggleGroup
        variant="shadow"
        value={deviceMode}
        options={deviceToggleOptions}
      />
    </div>
  )

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={dialogTitle}
      maxWidth="full"
      maxHeight="screen"
      closeOnInteractionOutside={false}
      hideCancel
      className="left-1/2 bottom-4 top-[85px] w-[80vw] max-w-[80vw] md:w-[80vw] -translate-x-1/2 translate-y-0 flex flex-col px-6 py-4"
    >
      <div className="min-h-0 flex-1 overflow-x-visible overflow-y-auto">
        {isPending ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <TextHeading size={4} className="animate-pulse">
              Loading menu preview...
            </TextHeading>
          </div>
        ) : isError || !topMenuConfig ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
            <Icon
              icon="warning-circle"
              size="2xl"
              color="current"
              className="text-red-400"
            />
            <TextBody className="text-red-400">
              Failed to load menu configuration preview
            </TextBody>
          </div>
        ) : (
          <div
            className={mergeClasses(
              'flex transition-all duration-300',
              deviceMode === 'desktop'
                ? 'w-full'
                : 'justify-center p-4',
            )}
          >
            <div
              className={mergeClasses(
                'w-full overflow-visible transition-all duration-300',
                deviceMode !== 'desktop' &&
                  'rounded-lg border border-neutral-700',
                DEVICE_WIDTH_CLASS[deviceMode],
              )}
            >
              <MenuBuilderPreview
                config={topMenuConfig}
                theme={previewTheme}
                deviceMode={deviceMode}
                libraryImages={libraryImages}
                libraryLessons={libraryLessons}
                logoURL={logoURL}
                showShell
              />
            </div>
          </div>
        )}
      </div>
      <DialogFooter hideCancel className="hidden" />
    </Dialog>
  )
}
