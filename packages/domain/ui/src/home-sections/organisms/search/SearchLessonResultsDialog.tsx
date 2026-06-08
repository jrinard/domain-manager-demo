import React from 'react'
import { Dialog, TextBody, SkeletonText } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { useSearchLessonQuery } from '@tyto/query'
import { useSyync } from '@spacedock/syyncronyyzed'
import { Link } from '@spacedock/navigator'
import type { SearchLessonResult } from '@tyto/client'

export interface SearchLessonResultsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchPhrase: string
}

/**
 * Dialog to display knowledge object search results
 * Based on legacy Tryyb search results page
 */
export const SearchLessonResultsDialog = ({
  open,
  onOpenChange,
  searchPhrase,
}: SearchLessonResultsDialogProps) => {
  const syync = useSyync()

  const searchQuery = useSearchLessonQuery({
    searchString: searchPhrase,
    enabled: open && searchPhrase.length > 0,
    top: 50,
  })

  // Type assertion needed because Response extends Responses.Search.Lesson.Get with result property
  // but TypeScript doesn't resolve the extended property
  const responseData = searchQuery.data as
    | { result?: { results: SearchLessonResult[] } }
    | undefined
  const results = responseData?.result?.results || []

  const handleLessonClick = (lessonID: number) => {
    if (!syync?.isConnected) {
      // When syync is not connected, Link component handles navigation
      return
    }

    void syync.sendMessage('launch-lesson-viewer', {
      lessonID,
    })

    // Close dialog after launching
    onOpenChange(false)
  }

  return (
    <Dialog
      className="max-h-[80vh] w-full max-w-[900px]"
      open={open}
      onOpenChange={onOpenChange}
      title={`Search Results for "${searchPhrase}"`}
    >
      <div className="flex flex-col gap-2">
        {searchQuery.isLoading ? (
          // Loading state
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="border-grayscale-200 dark:border-grayscale-700 flex gap-3 border-b pb-3"
              >
                <div className="bg-grayscale-200 dark:bg-grayscale-700 h-12 w-12 flex-shrink-0 rounded-md" />
                <div className="flex-1 space-y-1">
                  <SkeletonText size="base" length="long" />
                  <SkeletonText size="sm" length="medium" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          // No results
          <div className="text-grayscale-600 dark:text-grayscale-400 py-8 text-center">
            No results found for "{searchPhrase}"
          </div>
        ) : (
          // Results list
          <div className="max-h-[60vh] overflow-y-auto">
            {results.map((result: SearchLessonResult, idx: number) => (
              <SearchResultItem
                key={`${result.element.lessonID}-${idx}`}
                result={result}
                onLessonClick={handleLessonClick}
                useSyync={syync?.isConnected ?? false}
              />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}

interface SearchResultItemProps {
  result: SearchLessonResult
  onLessonClick: (lessonID: number) => void
  useSyync: boolean
}

const SearchResultItem = ({
  result,
  onLessonClick,
  useSyync,
}: SearchResultItemProps) => {
  const { element, assets } = result
  const firstAsset = assets && assets.length > 0 ? assets[0] : null

  const handleClick = () => {
    onLessonClick(element.lessonID)
  }

  // Get icon and color class based on assetType
  const getAssetIconAndColor = (assetType: string) => {
    const normalizedType = assetType.toLowerCase()

    switch (normalizedType) {
      case 'ocassignment':
        return {
          icon: 'assignment-ind-outline',
          colorClass: 'text-asset-assignment bg-asset-assignment-subtle',
        }
      case 'ocimage':
        return {
          icon: 'insert-photo',
          colorClass: 'text-asset-image bg-asset-image-subtle',
        }
      case 'ocvideo':
        return {
          icon: 'file-video',
          colorClass: 'text-asset-video bg-asset-video-subtle',
        }
      case 'ocaudio':
        return {
          icon: 'audio-book',
          colorClass: 'text-asset-audio bg-asset-audio-subtle',
        }
      case 'ocurl':
        return {
          icon: 'link-box-variant',
          colorClass: 'text-asset-url bg-asset-url-subtle',
        }
      case 'ocpdf':
        return {
          icon: 'file-pdf-box',
          colorClass: 'text-asset-pdf bg-asset-pdf-subtle',
        }
      case 'ocphoto':
        return {
          icon: 'insert-photo',
          colorClass: 'text-asset-image bg-asset-image-subtle',
        }
      case 'ocprofilephoto':
        return {
          icon: 'person-circle',
          colorClass: 'text-asset-profilephoto bg-asset-profilephoto-subtle',
        }
      case 'ocscorm':
        return {
          icon: 'learn-outline',
          colorClass: 'text-asset-scorm bg-asset-scorm-subtle',
        }
      case 'ocspreadsheet':
        return {
          icon: 'file-excel',
          colorClass: 'text-asset-speedsheet bg-asset-speedsheet-subtle',
        }
      case 'ocword':
        return {
          icon: 'file-word',
          colorClass: 'text-asset-word bg-asset-word-subtle',
        }
      case 'oczip':
        return {
          icon: 'folder-zip',
          colorClass: 'text-asset-zip bg-asset-zip-subtle',
        }
      case 'ocevent':
        return {
          icon: 'event-blank-outline',
          colorClass: 'text-secondary bg-secondary',
        }
      default:
        return {
          icon: 'file-document',
          colorClass: 'text-asset-document bg-asset-document-subtle',
        }
    }
  }

  const { icon: assetIcon, colorClass } = getAssetIconAndColor(
    element.assetType,
  )

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    } catch {
      return dateString
    }
  }

  const lessonUrl = `/viewer/?eID=${element.lessonID}`
  const content = (
    <div className="border-grayscale-200 dark:border-grayscale-700 dark:hover:bg-grayscale-800 flex cursor-pointer gap-4 border-b px-2 py-3 transition-colors hover:bg-blue-50">
      {/* Icon with theme colors */}
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md ${colorClass}`}
      >
        <Icon icon={assetIcon} className="h-8 w-8" />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* Lesson Name */}
        <TextBody className="text-grayscale-900 dark:text-grayscale-100 font-medium">
          {element.lessonName || element.name}
        </TextBody>

        {/* Description */}
        {element.lessonDesc && (
          <TextBody className="text-grayscale-600 dark:text-grayscale-400 text-xs">
            {element.lessonDesc}
          </TextBody>
        )}

        {/* Metadata */}
        <div className="text-grayscale-500 dark:text-grayscale-500 flex items-center gap-3 text-xs">
          {firstAsset && (
            <>
              <span>{firstAsset.assetName}</span>
              <span>•</span>
            </>
          )}
          <span>Modified {formatDate(element.modifiedDate)}</span>
          {result.scoreAssetDecayed > 0 && (
            <>
              <span>•</span>
              <span>Relevance: {Math.round(result.scoreAssetDecayed)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )

  if (useSyync) {
    return <div onClick={handleClick}>{content}</div>
  }

  return (
    <Link to={lessonUrl} target="_blank" className="no-underline">
      {content}
    </Link>
  )
}
