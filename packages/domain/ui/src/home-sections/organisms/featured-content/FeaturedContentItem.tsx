import type { LibraryTeamFeatured } from '@tyto/query'
import type { SectionRenderMode } from '@domain/configs'
import { TextBody, useToast } from '@spacedock/falcon-ui'
import { useSyync } from '@spacedock/syyncronyyzed'
import { createFileURL } from '../../../utils/file-path'
import { renderAssetIcon } from '../../../utils/asset-icon'
import { getEncoding } from '@tyto/assets'
import { useMemo, useState } from 'react'

interface FeaturedContentItemProps {
  item: LibraryTeamFeatured
  renderMode?: SectionRenderMode
}

export const FeaturedContentItem = ({
  item,
  renderMode = 'prod',
}: FeaturedContentItemProps) => {
  const syync = useSyync()
  const toast = useToast()
  const [imageError, setImageError] = useState(false)

  // Extract first asset once - handle both API response structures
  const firstAsset = useMemo(() => {
    if (!item.assets || item.assets.length === 0) return null
    return item.assets[0] as any
  }, [item.assets])

  // Get asset type from first asset
  const assetType = useMemo(() => {
    if (!firstAsset) return null
    return firstAsset?.assetType || firstAsset?.item?.assetType || null
  }, [firstAsset])

  // Get encodings from first asset
  const encodings = useMemo(() => {
    if (!firstAsset) return []
    const encodingsArray =
      firstAsset?.encodings || firstAsset?.item?.encodings || []
    return Array.isArray(encodingsArray) && encodingsArray.length > 0
      ? encodingsArray
      : []
  }, [firstAsset])

  // Get thumbnail path - prioritize thumbOverimage, then thumbnailPath, then first asset encoding
  const getThumbnailPath = (): string | null => {
    // 1. Check thumbOverimage first
    if (item.thumbOverimage?.pathURL) {
      return createFileURL(item.thumbOverimage.pathURL)
    }
    // 2. Check thumbnailPath
    if (item.thumbnailPath) {
      return createFileURL(item.thumbnailPath)
    }
    // 3. Check encodings from first asset
    if (encodings && encodings.length > 0) {
      const encoding = getEncoding(encodings, 'ocTHUMBNAIL')
      if (encoding?.pathURL) {
        return createFileURL(encoding.pathURL)
      }
      // Fallback to ocDEFAULT if ocTHUMBNAIL not available
      const defaultEncoding = getEncoding(encodings, 'ocDEFAULT')
      if (defaultEncoding?.pathURL) {
        return createFileURL(defaultEncoding.pathURL)
      }
    }
    return null
  }

  const thumbnailPath = getThumbnailPath()

  // Get asset type icon when no thumbnail is available
  const assetIcon = renderAssetIcon(assetType, 'h-16 w-16')

  const handleClick = () => {
    if (renderMode === 'mock' || renderMode === 'error') return

    // Launch knowledge vault viewer for both ocLESSON and ocLIBCAT items using syync
    if (!syync?.isConnected) {
      toast.toastError({
        description:
          'Navigation is not available. Please ensure you are connected.',
      })
      return
    }

    // Use syync to launch the knowledge object viewer
    // item.aboutID works for both lessons and library categories
    void syync
      .sendMessage('launch-lesson-viewer', {
        lessonID: item.aboutID,
        assetType: assetType || undefined,
      })
      .catch(() => {
        toast.toastError({
          description:
            'Failed to launch knowledge object viewer. Please try again.',
        })
      })
  }

  return (
    <button
      onClick={handleClick}
      disabled={renderMode === 'mock' || renderMode === 'error'}
      className="border-grayscale-600 bg-grayscale-800 hover:border-grayscale-500 group flex h-full w-full max-w-[180px] flex-col overflow-hidden rounded-lg border transition-all hover:shadow-lg disabled:cursor-not-allowed"
    >
      {/* Thumbnail on top */}
      <div className="bg-grayscale-700 relative aspect-video w-full flex-shrink-0 overflow-hidden">
        {thumbnailPath && !imageError ? (
          <img
            src={thumbnailPath}
            alt={item.aboutName || 'Featured content item'}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              setImageError(true)
            }}
          />
        ) : (
          <div className="bg-grayscale-700 text-grayscale-400 flex h-full w-full items-center justify-center">
            {assetIcon || (
              <TextBody className="text-grayscale-400 text-xs">
                No Image
              </TextBody>
            )}
          </div>
        )}
      </div>

      {/* Text below thumbnail */}
      <div className="flex flex-shrink-0 flex-col p-3">
        <TextBody className="text-grayscale-100 line-clamp-2 text-sm font-medium">
          {item.aboutName || 'Untitled'}
        </TextBody>
      </div>
    </button>
  )
}
