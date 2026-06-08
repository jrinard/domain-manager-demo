import { useMemo } from 'react'
import { mergeClasses } from '@falcon/style'
import { Grid } from '@spacedock/bento'
import {
  Dialog,
  DialogFooter,
  IconButton,
  TextBody,
  TextHeading,
  ToggleGroup,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import type { ScreenSizeLayout } from '@domain/configs'

import { useHomeConfig } from '../../../data/hooks/useHomeConfig'
import { PreviewSectionRouter } from '../layoutBuilder/PreviewSectionRouter'

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

interface HomePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  configGUID: string
  configName?: string
  deviceMode: DeviceMode
  onDeviceModeChange: (mode: DeviceMode) => void
}

const DEVICE_WIDTH_CLASS: Record<DeviceMode, string> = {
  desktop: 'max-w-full',
  tablet: 'max-w-[768px]',
  mobile: 'max-w-[375px]',
}

export const HomePreviewDialog = ({
  open,
  onOpenChange,
  configGUID,
  configName,
  deviceMode,
  onDeviceModeChange,
}: HomePreviewDialogProps) => {
  if (!open) return null

  return (
    <HomePreviewDialogContent
      open={open}
      onOpenChange={onOpenChange}
      configGUID={configGUID}
      configName={configName}
      deviceMode={deviceMode}
      onDeviceModeChange={onDeviceModeChange}
    />
  )
}

const HomePreviewDialogContent = ({
  open,
  onOpenChange,
  configGUID,
  configName,
  deviceMode,
  onDeviceModeChange,
}: HomePreviewDialogProps) => {
  const {
    homeConfig,
    attachments,
    isPending,
    isError,
    data: remoteConfig,
  } = useHomeConfig({
    configID: configGUID,
    disabled: !open || !configGUID,
  })

  const domainID = remoteConfig?.domainID

  const layout: ScreenSizeLayout | undefined = useMemo(() => {
    if (!homeConfig) return undefined

    if (deviceMode === 'mobile') {
      return (
        homeConfig.mobile_layout ??
        homeConfig.tablet_layout ??
        homeConfig.layout
      )
    }
    if (deviceMode === 'tablet') {
      return homeConfig.tablet_layout ?? homeConfig.layout
    }
    return homeConfig.layout
  }, [homeConfig, deviceMode])

  const sections = homeConfig?.sections

  const bgImageUrl = layout?.background_image_url

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
        <span>Preview</span>
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
      className="bottom-4 left-1/2 top-[85px] flex w-[95vw] -translate-x-1/2 translate-y-0 flex-col overflow-hidden px-6 py-4"
    >
      <div className="min-h-0 flex-1 overflow-y-scroll [scrollbar-color:#525252_#262626] [scrollbar-width:thin]">
        {isPending ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <TextHeading size={4} className="animate-pulse">
              Loading preview...
            </TextHeading>
          </div>
        ) : isError ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-2">
            <Icon
              icon="warning-circle"
              size="2xl"
              color="current"
              className="text-red-400"
            />
            <TextBody className="text-red-400">
              Failed to load configuration preview
            </TextBody>
          </div>
        ) : (
          <div
            className={mergeClasses(
              'flex transition-all duration-300',
              deviceMode === 'desktop' ? 'w-full' : 'justify-center p-4',
            )}
          >
            <div
              className={mergeClasses(
                'w-full overflow-hidden transition-all duration-300',
                deviceMode !== 'desktop' &&
                  'rounded-lg border border-neutral-700',
                DEVICE_WIDTH_CLASS[deviceMode],
              )}
            >
              <div
                className="bg-cover bg-center bg-no-repeat"
                style={
                  bgImageUrl
                    ? { backgroundImage: `url(${bgImageUrl})` }
                    : undefined
                }
              >
                <div data-surface="dark" className="group">
                  <article
                    className={mergeClasses(
                      'text-homepage-fg flex h-[calc(100vh-250px)] w-full flex-col overflow-y-scroll p-4 [scrollbar-color:#525252_#262626] [scrollbar-width:thin]',
                      !bgImageUrl && 'bg-homepage',
                      layout?.vertical_alignment === 'center'
                        ? 'justify-center'
                        : 'justify-start',
                    )}
                  >
                    {sections ? (
                      <Grid
                        areasByName={layout?.areas_by_name}
                        columns={layout?.columns}
                        gutter="standard"
                        className="mx-auto min-w-0 max-w-[1450px]"
                      >
                        {sections.map((section: any) => (
                          <PreviewSectionRouter
                            key={section.id}
                            section={section}
                            domainID={domainID}
                            attachments={attachments}
                          />
                        ))}
                      </Grid>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <TextBody className="text-grayscale-500">
                          No sections configured
                        </TextBody>
                      </div>
                    )}
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <DialogFooter hideCancel className="hidden" />
    </Dialog>
  )
}
