import { Icon } from '@falcon/icons'
import type { ReactElement } from 'react'

/**
 * Maps an asset type to its corresponding icon name
 * Used across the codebase for consistent asset type icon rendering
 */
export function getAssetIconName(assetType: string | null | undefined): string | null {
  if (!assetType) return null

  const normalizedType = assetType.toLowerCase()

  switch (normalizedType) {
    case 'ocassignment':
      return 'assignment-ind-outline'
    case 'ocimage':
    case 'ocphoto':
      return 'insert-photo'
    case 'ocvideo':
      return 'file-video'
    case 'ocaudio':
      return 'audio-book'
    case 'ocurl':
      return 'link-box-variant'
    case 'ocpdf':
      return 'file-pdf-box'
    case 'ocprofilephoto':
      return 'person-circle'
    case 'ocscorm':
      return 'learn-outline'
    case 'ocspreadsheet':
      return 'file-excel'
    case 'ocword':
      return 'file-word'
    case 'oczip':
      return 'folder-zip'
    case 'ocevent':
      return 'event-blank-outline'
    case 'ocquickdoc':
    case 'ocdoc':
      return 'file-document'
    case 'ocfile':
    default:
      return 'file'
  }
}

/**
 * Renders an Icon component for a given asset type
 * @param assetType - The asset type (e.g., 'ocWord', 'ocPDF')
 * @param className - Optional className for the icon
 * @param size - Optional size prop for the icon (e.g., '5xl', 'h-16 w-16')
 */
export function renderAssetIcon(
  assetType: string | null | undefined,
  className?: string,
  size?: string,
): ReactElement | null {
  const iconName = getAssetIconName(assetType)
  if (!iconName) return null

  if (size) {
    return <Icon icon={iconName} size={size as any} className={className} />
  }

  return <Icon icon={iconName} className={className} />
}
