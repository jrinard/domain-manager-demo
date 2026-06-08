import { Dialog } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ScreenSizeLayout, HomeConfig } from '@domain/configs'
import { BackgroundStyleControls } from './BackgroundStyleControls'
import { useKeyedDomainImages } from '../../../data/hooks/useKeyedDomainImages'
import { createFileURL } from '../../../data/utils/file-path'
import { getEncoding } from '@tyto/assets'
import { useTryybServices } from '@spacedock/tryyb-services'
import { DOMAIN_MANAGER_PATHS } from '../../../data/constants'

interface ImageData {
  imageID: number
  aboutID: number
  aboutType: string
  originalMimeType: string
  height: number
  width: number
  length: number
  originalSizeBytes: number
  sequence: number
  orientation: string
  originalMD5: string
  userDescription: string
  pathURL: string
  imageName: string
  originalName: string
  elementType: string
  imageType: string
  activeStatus: string
}

// Portfolio demo: local presets in public/demo-assets/bg-images/
const BACKGROUND_OPTIONS = [
  { id: 1, name: 'Dark Prism', path: '/demo-assets/bg-images/PrismBg1-black.jpg' },
  { id: 2, name: 'Light Prism', path: '/demo-assets/bg-images/PrismBg1-white.jpg' },
  { id: 3, name: 'Purple Midnight', path: '/demo-assets/bg-images/Purple_Top_Down.jpg' },
  { id: 4, name: 'Blue Ocean', path: '/demo-assets/bg-images/Blue_Top_Down.jpg' },
  { id: 5, name: 'Red Star', path: '/demo-assets/bg-images/Red_Top_Down.jpg' },
  { id: 6, name: 'Tryyb Prism', path: '/demo-assets/bg-images/Tryyb_Back.jpg' },
]

const getImagePath = (image: ImageData) => createFileURL(image.pathURL)

interface LayoutBackgroundProps {
  domainID?: number
  open: boolean
  onOpenChange: (open: boolean) => void
  currentLayout?: ScreenSizeLayout
  updateLayout: (layout: ScreenSizeLayout) => void
  config: HomeConfig
  mergeConfig: (config: Partial<HomeConfig>) => void
}

export const LayoutBackground = ({
  domainID,
  open,
  onOpenChange,
  currentLayout,
  updateLayout,
  config,
  mergeConfig,
}: LayoutBackgroundProps) => {
  const contextID = domainID || 0
  const { keyedImages } = useKeyedDomainImages({
    domainID: contextID,
  })
  const services = useTryybServices()

  // Get the real image data directly from keyedImages
  const imageData = useMemo(() => {
    const desktopImageRaw = keyedImages['homeBackgroundImagePath']
    const tabletImageRaw = keyedImages['homeBackgroundImagePathTablet']
    const mobileImageRaw = keyedImages['homeBackgroundImagePathMobile']

    const result: {
      desktop?: ImageData
      tablet?: ImageData
      mobile?: ImageData
    } = {}

    if (desktopImageRaw?.pathURL) {
      result.desktop = desktopImageRaw as ImageData
    }

    if (tabletImageRaw?.pathURL) {
      result.tablet = tabletImageRaw as ImageData
    }

    if (mobileImageRaw?.pathURL) {
      result.mobile = mobileImageRaw as ImageData
    }

    return result
  }, [keyedImages])

  const desktopImage = imageData.desktop
  const tabletImage = imageData.tablet
  const mobileImage = imageData.mobile

  const hasTablet = tabletImage && tabletImage.pathURL
  const hasMobile = mobileImage && mobileImage.pathURL

  const [showTablet, setShowTablet] = useState(false)
  const [showMobile, setShowMobile] = useState(false)
  const [activeDevice, setActiveDevice] = useState<
    'desktop' | 'tablet' | 'mobile'
  >('desktop')
  const [showDesktop, setShowDesktop] = useState(true)
  const [noTabletBackground, setNoTabletBackground] = useState(false)
  const [noMobileBackground, setNoMobileBackground] = useState(false)
  const [noBackground, setNoBackground] = useState(false)
  const [selectedBackgroundDesktop, setSelectedBackgroundDesktop] = useState<
    string | undefined
  >(() => {
    // Prefer the explicitly saved config background so the dialog matches saved layout.
    return (
      config?.layout?.background_image_url ||
      (desktopImage ? getImagePath(desktopImage) : undefined)
    )
  })
  const [selectedBackgroundTablet, setSelectedBackgroundTablet] = useState<
    string | undefined
  >(() => {
    return (
      config?.tablet_layout?.background_image_url ||
      (tabletImage ? getImagePath(tabletImage) : undefined)
    )
  })
  const [selectedBackgroundMobile, setSelectedBackgroundMobile] = useState<
    string | undefined
  >(() => {
    return (
      config?.mobile_layout?.background_image_url ||
      (mobileImage ? getImagePath(mobileImage) : undefined)
    )
  })
  const [customImages, setCustomImages] = useState<
    { id: string; name: string; path: string }[]
  >([])

  // Update selectedBackgroundDesktop when desktopImage changes
  useEffect(() => {
    if (desktopImage?.pathURL && !selectedBackgroundDesktop && !noBackground) {
      setSelectedBackgroundDesktop(getImagePath(desktopImage))
    }
  }, [desktopImage, selectedBackgroundDesktop, noBackground])

  // When the dialog opens, prefer the config's active background so the UI
  // matches the saved layout. This avoids defaulting back to the domain image
  // when a user previously selected something other then the domain image
  useEffect(() => {
    if (!open) return

    const activeFromConfig = config?.layout?.background_image_url

    if (typeof activeFromConfig === 'string' && activeFromConfig.length > 0) {
      setSelectedBackgroundDesktop(activeFromConfig)
      setNoBackground(false)
      return
    }

    // Don't react to noBackground toggles here — only initialize when opening or config/desktopImage changes.
    if (desktopImage?.pathURL) {
      setSelectedBackgroundDesktop(getImagePath(desktopImage))
    }
  }, [open, config, desktopImage])

  // Desktop background style states
  const [desktopSize, setDesktopSize] = useState<string>(
    config.layout.background_image_styles?.backgroundSize || 'cover',
  )
  const [desktopPosition, setDesktopPosition] = useState<string>(
    config.layout.background_image_styles?.backgroundPosition ||
      'center center',
  )
  const [desktopRepeat, setDesktopRepeat] = useState<string>(
    config.layout.background_image_styles?.backgroundRepeat || 'no-repeat',
  )

  // Tablet background style states
  const [tabletSize, setTabletSize] = useState<string>(
    config.tablet_layout?.background_image_styles?.backgroundSize || 'cover',
  )
  const [tabletPosition, setTabletPosition] = useState<string>(
    config.tablet_layout?.background_image_styles?.backgroundPosition ||
      'center',
  )
  const [tabletRepeat, setTabletRepeat] = useState<string>(
    config.tablet_layout?.background_image_styles?.backgroundRepeat ||
      'no-repeat',
  )

  // Mobile background style states
  const [mobileSize, setMobileSize] = useState<string>(
    config.mobile_layout?.background_image_styles?.backgroundSize || 'cover',
  )
  const [mobilePosition, setMobilePosition] = useState<string>(
    config.mobile_layout?.background_image_styles?.backgroundPosition || 'top',
  )
  const [mobileRepeat, setMobileRepeat] = useState<string>(
    config.mobile_layout?.background_image_styles?.backgroundRepeat ||
      'no-repeat',
  )

  const handleBackgroundSelect = (
    path: string,
    device: 'desktop' | 'tablet' | 'mobile' = 'desktop',
  ) => {
    if (device === 'desktop') setSelectedBackgroundDesktop(path)
    if (device === 'tablet') setSelectedBackgroundTablet(path)
    if (device === 'mobile') setSelectedBackgroundMobile(path)
    // Enable the override for the chosen device without changing open/scroll state
    if (device === 'desktop') {
      setNoBackground(false)
    }
    if (device === 'tablet') {
      setNoTabletBackground(false)
    }
    if (device === 'mobile') {
      setNoMobileBackground(false)
    }
  }

  const handleToggleChange = (checked: boolean) => {
    setNoBackground(checked)
    if (checked) {
      // When disabling backgrounds, collapse all device accordions and clear selections so
      // the UI reflects the deactivated state (no checks).
      setShowDesktop(false)
      setShowTablet(false)
      setShowMobile(false)
      setSelectedBackgroundDesktop(undefined)
      setSelectedBackgroundTablet(undefined)
      setSelectedBackgroundMobile(undefined)
      setActiveDevice('desktop')
    } else {
      // Auto-select desktop image when turning background back on and open desktop accordion.
      setSelectedBackgroundDesktop(
        desktopImage ? getImagePath(desktopImage) : undefined,
      )
      setShowDesktop(true)
      setActiveDevice('desktop')
    }
  }

  // Open the file chooser and set selected background from a lesson asset (prefer ocDEFAULT)
  const openFileChooser = async (
    device: 'desktop' | 'tablet' | 'mobile' = 'desktop',
  ) => {
    try {
      const res = await services.chooseFile(['Library'])
      const lesson = res?.lessons?.[0] as any
      const assetEncodings = lesson?.assets?.[0]?.encodings

      const defaultPath =
        getEncoding(assetEncodings, 'ocDEFAULT')?.pathURL ||
        getEncoding(assetEncodings, 'ocTHUMBNAIL')?.pathURL ||
        lesson?.thumbNailPath

      if (defaultPath) {
        // Normalize any HTML-escaped ampersands that may come from server responses
        const normalized =
          typeof defaultPath === 'string'
            ? defaultPath.replace(/&amp;/g, '&')
            : defaultPath
        const full =
          typeof normalized === 'string' && !/^https?:\/\//i.test(normalized)
            ? // Include sessionKey for viewAsset paths so images load without redirecting to login
              createFileURL(normalized, { includeSessionKey: true })
            : // If it's already an absolute URL, ensure session is appended for viewAsset paths
              normalized
        // Set selection for requested device
        if (device === 'desktop') setSelectedBackgroundDesktop(full)
        if (device === 'tablet') setSelectedBackgroundTablet(full)
        if (device === 'mobile') setSelectedBackgroundMobile(full)
        // Add to custom images list if not already present
        setCustomImages((prev) => {
          if (prev.find((p) => p.path === full)) return prev
          const id = `chooser-${Date.now()}`
          const name = lesson?.lessonName || 'Chosen Image'
          return [{ id, name, path: full }, ...prev].slice(0, 10)
        })

        if (device === 'desktop') setNoBackground(false)
        if (device === 'tablet') setNoTabletBackground(false)
        if (device === 'mobile') setNoMobileBackground(false)
        try {
          onOpenChange(true)
        } catch (err) {
          void err
        }
      }
    } catch (err) {
      void err
    }
  }

  const DeviceSection = ({
    device,
    label,
    show,
    setShow,
    selected,
    setSelected,
    noOverride,
    setNoOverride,
    domainImage,
    size,
    setSize,
    position,
    setPosition,
    repeat,
    setRepeat,
  }: {
    device: 'desktop' | 'tablet' | 'mobile'
    label: string
    show: boolean
    setShow: (v: boolean) => void
    selected: string | undefined
    setSelected: (v: string | undefined) => void
    noOverride?: boolean
    setNoOverride?: (v: boolean) => void
    domainImage?: ImageData
    size: string
    setSize: (v: string) => void
    position: string
    setPosition: (v: string) => void
    repeat: string
    setRepeat: (v: string) => void
  }) => {
    const domainPath = domainImage ? getImagePath(domainImage) : undefined

    return (
      <div className="bg-grayscale-800 rounded-lg p-4">
        <div
          role="button"
          onClick={() => {
            const next = !show
            setShow(next)
            setActiveDevice(next ? device : 'desktop')
          }}
          className="flex w-full cursor-pointer items-center justify-between hover:text-green-300"
        >
          <div className="flex items-center gap-2">
            {/* selected indicator (check circle) */}
            {selected ? (
              <Icon icon="check-circle" size="lg" className="text-green-400" />
            ) : (
              <Icon icon="circle" size="lg" className="text-gray-500" />
            )}

            {/* (switch removed) */}

            {/* label + deactivate link */}
            <div className="flex items-center gap-2">
              <span className={selected ? 'text-green-400' : 'text-gray-300'}>
                {label}
              </span>
              {selected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // clear selection and turn off override for this device
                    setSelected(undefined)
                    if (device === 'desktop') {
                      // turn global background off (clears selections and closes accordions)
                      handleToggleChange(true)
                    } else {
                      setNoOverride?.(true)
                    }
                  }}
                  className="text-primary hover:text-primary-subtle text-sm underline"
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
          <Icon icon={show ? 'chevron-up' : 'chevron-down'} size="2xl" />
        </div>

        {show && (
          <div className="mt-4 space-y-3">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="border-grayscale-600 overflow-hidden rounded-lg border">
                  <div
                    className={
                      device === 'desktop'
                        ? 'aspect-video w-full'
                        : device === 'tablet'
                          ? 'aspect-[3/4] w-full'
                          : 'aspect-[9/16] w-full'
                    }
                    style={{
                      backgroundImage: selected
                        ? `url(${selected})`
                        : domainPath
                          ? `url(${domainPath})`
                          : undefined,
                      backgroundSize: size,
                      backgroundPosition: position,
                      backgroundRepeat: repeat,
                      backgroundColor: 'var(--site-bg, #000)',
                    }}
                  />
                </div>
                <div className="mt-2 text-center text-xs text-gray-400">
                  {selected
                    ? `Selected ${device.charAt(0).toUpperCase() + device.slice(1)} Background`
                    : domainPath
                      ? `Domain ${device.charAt(0).toUpperCase() + device.slice(1)} Image`
                      : `No ${device} image selected`}
                </div>
              </div>

              <div className="flex max-h-[230px] flex-col gap-1 overflow-y-auto pr-2">
                <div className="mb-1 flex flex-shrink-0 flex-col">
                  <button
                    className="border-grayscale-600 bg-grayscale-700 hover:bg-grayscale-600 h-8 w-36 rounded-md border text-xs text-white"
                    onClick={() => openFileChooser(device)}
                  >
                    {`Choose from Library`}
                  </button>
                </div>

                {domainPath && (
                  <div
                    key={`${device}-domain-image`}
                    className="flex flex-shrink-0 flex-col"
                  >
                    <button
                      className="w-30 group h-16 overflow-hidden rounded-none transition-colors duration-150 "
                      onClick={() => handleBackgroundSelect(domainPath, device)}
                      title={`Domain ${device} Image`}
                    >
                      <img
                        src={domainPath}
                        alt={`Domain ${device}`}
                        className={`h-full w-full object-cover transition-colors duration-150 ${selected === domainPath ? 'border-primary border-2' : 'border-2 border-white/20 group-hover:border-2 group-hover:border-gray-400'}`}
                      />
                    </button>
                    <div className="mt-1 text-center text-xs text-gray-400">{`Domain ${device[0].toUpperCase()}${device.slice(1)} Image`}</div>
                  </div>
                )}

                {customImages.map((img) => (
                  <div key={img.id} className="flex flex-shrink-0 flex-col">
                    <button
                      className="w-30 group h-16 overflow-hidden rounded-none transition-colors duration-150 "
                      onClick={() => handleBackgroundSelect(img.path, device)}
                      title={img.name}
                    >
                      <img
                        src={img.path}
                        alt={img.name}
                        className={`block h-full w-full object-cover transition-colors duration-150 ${selected === img.path ? 'border-primary border-2' : 'border-2 border-white/20 group-hover:border-2 group-hover:border-gray-400'}`}
                      />
                    </button>
                    <div className="mt-1 text-center text-xs text-gray-400">
                      {img.name}
                    </div>
                  </div>
                ))}

                {BACKGROUND_OPTIONS.map((option) => (
                  <div key={option.id} className="flex flex-shrink-0 flex-col">
                    <button
                      className="w-30 group h-16 overflow-hidden rounded-none transition-colors duration-150 focus:outline-none"
                      onClick={() =>
                        handleBackgroundSelect(option.path, device)
                      }
                      title={option.name}
                    >
                      <img
                        src={option.path}
                        alt={option.name}
                        className={`border-1 h-full w-full object-cover transition-colors duration-150 ${selected === option.path ? 'border-primary border-2' : 'border-2 border-white/20 group-hover:border-2 group-hover:border-gray-400'}`}
                      />
                    </button>
                    <div className="mt-1 text-center text-xs text-gray-400">
                      {option.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <BackgroundStyleControls
              deviceLabel={`${device[0].toUpperCase()}${device.slice(1)} Styles`}
              backgroundSize={size}
              setBackgroundSize={setSize}
              backgroundPosition={position}
              setBackgroundPosition={setPosition}
              backgroundRepeat={repeat}
              setBackgroundRepeat={setRepeat}
            />
          </div>
        )}
      </div>
    )
  }

  const handleSave = () => {
    if (!currentLayout) return

    // If no background selected, clear all
    // Ensure tablet/mobile layouts exist structurally
    const baseTablet = config.tablet_layout ||
      config.layout || { columns: 12, areas_by_name: [] }
    const baseMobile = config.mobile_layout ||
      config.layout || { columns: 12, areas_by_name: [] }

    if (noBackground) {
      mergeConfig({
        layout: {
          ...config.layout,
          background_image_url: undefined,
        },
        tablet_layout: {
          ...baseTablet,
          background_image_url: undefined,
        },
        mobile_layout: {
          ...baseMobile,
          background_image_url: undefined,
        },
      })
      onOpenChange(false)
      return
    }

    const isFromDomainImages =
      desktopImage && selectedBackgroundDesktop === getImagePath(desktopImage)

    // Update all three layouts with device-specific styles
    const normalizeForSave = (val?: string | undefined) => {
      if (!val) return val
      const v = typeof val === 'string' ? val.replace(/&amp;/g, '&') : val
      try {
        // If full absolute URL, strip origin and keep path+query
        const u = new URL(v)
        return u.pathname + u.search
      } catch {
        // Not an absolute URL — return as-is
        return v
      }
    }

    const savedDesktop = normalizeForSave(selectedBackgroundDesktop)
    let savedTablet =
      normalizeForSave(selectedBackgroundTablet) ||
      (isFromDomainImages && tabletImage
        ? getImagePath(tabletImage)
        : normalizeForSave(selectedBackgroundDesktop))
    let savedMobile =
      normalizeForSave(selectedBackgroundMobile) ||
      (isFromDomainImages && mobileImage
        ? getImagePath(mobileImage)
        : normalizeForSave(selectedBackgroundDesktop))

    // Respect explicit "no override" toggles that clear the override regardless of domain images
    if (noTabletBackground) savedTablet = undefined
    if (noMobileBackground) savedMobile = undefined

    mergeConfig({
      layout: {
        ...config.layout,
        background_image_url: savedDesktop,
        background_image_styles: {
          backgroundSize: desktopSize,
          backgroundPosition: desktopPosition,
          backgroundRepeat: desktopRepeat,
        },
      },
      tablet_layout: {
        ...(config.tablet_layout ||
          config.layout || { columns: 12, areas_by_name: [] }),
        background_image_url: savedTablet,
        background_image_styles: {
          backgroundSize: tabletSize,
          backgroundPosition: tabletPosition,
          backgroundRepeat: tabletRepeat,
        },
      },
      mobile_layout: {
        ...(config.mobile_layout ||
          config.layout || { columns: 12, areas_by_name: [] }),
        background_image_url: savedMobile,
        background_image_styles: {
          backgroundSize: mobileSize,
          backgroundPosition: mobilePosition,
          backgroundRepeat: mobileRepeat,
        },
      },
    })

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Layout Background"
      completeLabel="Save"
      action={{
        onClick: handleSave,
      }}
    >
      <div className="space-y-6 p-6">
        <div className="mt-4">
          <div className="mt-2 text-sm text-gray-400">
            Assign the home page background. Set override background images for
            each device size.
          </div>
        </div>

        {noBackground && (
          <div className="text-sm">
            Turning this off disables the layout background override, but the
            original image might still remain in "Images" section. To remove it
            completely, you can delete it in the{' '}
            <Link
              to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${domainID}/images`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-subtle underline"
            >
              Image Upload
            </Link>
            .
          </div>
        )}

        {/* Background preview / Device accordions */}
        <div className="space-y-4">
          {/* Device availability status */}
          <div className="space-y-2 rounded-lg p-4 text-sm">
            <div className="space-y-4">
              <DeviceSection
                device="desktop"
                label="Desktop Background Override"
                show={showDesktop}
                setShow={setShowDesktop}
                selected={selectedBackgroundDesktop}
                setSelected={setSelectedBackgroundDesktop}
                domainImage={desktopImage}
                size={desktopSize}
                setSize={setDesktopSize}
                position={desktopPosition}
                setPosition={setDesktopPosition}
                repeat={desktopRepeat}
                setRepeat={setDesktopRepeat}
              />
              <DeviceSection
                device="tablet"
                label="Tablet Background Override"
                show={showTablet}
                setShow={setShowTablet}
                selected={selectedBackgroundTablet}
                setSelected={setSelectedBackgroundTablet}
                setNoOverride={setNoTabletBackground}
                domainImage={tabletImage}
                size={tabletSize}
                setSize={setTabletSize}
                position={tabletPosition}
                setPosition={setTabletPosition}
                repeat={tabletRepeat}
                setRepeat={setTabletRepeat}
              />

              <DeviceSection
                device="mobile"
                label="Mobile Background Override"
                show={showMobile}
                setShow={setShowMobile}
                selected={selectedBackgroundMobile}
                setSelected={setSelectedBackgroundMobile}
                setNoOverride={setNoMobileBackground}
                domainImage={mobileImage}
                size={mobileSize}
                setSize={setMobileSize}
                position={mobilePosition}
                setPosition={setMobilePosition}
                repeat={mobileRepeat}
                setRepeat={setMobileRepeat}
              />
            </div>
          </div>
        </div>

        {/* Link to image upload page */}
        <div className="text-center">
          <Link
            to={`${DOMAIN_MANAGER_PATHS.BASE_ROUTE}/domain/${domainID}/images`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-subtle text-sm underline"
          >
            Go to Image Upload
          </Link>
        </div>
      </div>
    </Dialog>
  )
}
