import type { SectionRenderMode, HomeSection } from '@domain/configs'
import type { OpSectionData } from '@domain/schemas'
import {
  opSubTypeSchema,
  feedSubTypeSchema,
  petSubTypeSchema,
} from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { noop } from 'lodash'
import { useMemo } from 'react'
import { useSyync } from '@spacedock/syyncronyyzed'
import { Link } from '@spacedock/navigator'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'
import { useBaseOrigins } from '@spacedock/origins'
import { makePathFullyQualified } from '@tyto/assets'

export interface PublicationData {
  lessonID?: number
  thumbNailPath?: string
}

interface OPSectionContentProps {
  section: HomeSection<OpSectionData>
  sectionData: OpSectionData
  renderMode: SectionRenderMode
  domainID: number
  publicationData: PublicationData
  attachments?: DomainUI.Attachment[]
}

export const OPSectionContent = ({
  section,
  sectionData,
  renderMode,
  domainID,
  publicationData,
  attachments,
}: OPSectionContentProps) => {
  const syync = useSyync()
  const subType = sectionData.sub_type || 'OP'

  //* Get the correct assets base origin based on the current environment
  const { assetsBaseOrigin } = useBaseOrigins()

  const hasItem = true

  // Get the lessonID from publicationData
  const lessonId = publicationData.lessonID

  // Parse sectionData through the schema to apply defaults
  const parsedData = useMemo(() => {
    let schema
    switch (subType) {
      case 'Feed':
        schema = feedSubTypeSchema
        break
      case 'Pet':
        schema = petSubTypeSchema
        break
      case 'OP':
      default:
        schema = opSubTypeSchema
        break
    }
    // Parse through schema to apply defaults
    return schema.parse(sectionData)
  }, [sectionData, subType])

  // Get configurable values from parsed data (schema defaults are now applied)
  const title = parsedData.title
  const detailsText = parsedData.details_text
  const leftButtonText = parsedData.left_button_text
  const rightButtonText = parsedData.right_button_text
  // Normalize URL for hash routing - ensure absolute paths start with #/
  // This prevents React Router from resolving /odi relative to current route (e.g., /landing/odi)
  const url = parsedData.url
    ? parsedData.url.startsWith('#')
      ? parsedData.url
      : parsedData.url.startsWith('/')
        ? `#${parsedData.url}`
        : parsedData.url
    : ''

  // Get tag image from attachments based on subtype
  const tagOverrideId = useMemo(() => {
    switch (subType) {
      case 'Feed':
        return 'feedTagOverride' in parsedData
          ? (parsedData.feedTagOverride ?? 0)
          : 0
      case 'Pet':
        return 'petTagOverride' in parsedData
          ? (parsedData.petTagOverride ?? 0)
          : 0
      case 'OP':
      default:
        return 'odiTagOverride' in parsedData
          ? (parsedData.odiTagOverride ?? 0)
          : 0
    }
  }, [parsedData, subType])

  const { pathURL: tagPathURL } = useMatchingAttachment(
    tagOverrideId,
    attachments,
  )

  const getTagImage = () => {
    const pathURL = tagPathURL ?? undefined

    // tagPathURL from useMatchingAttachment is already fully qualified via createFileURL,
    // which correctly determines the origin based on the current environment (OC, han, lando, cherrylb, etc).
    // So we can use it directly without any re-processing.
    return pathURL
  }

  const getThumbnailPath = () => {
    const path = publicationData.thumbNailPath

    if (!path) {
      return undefined
    }

    // If path is already a full URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    // If path is a relative path, make it fully qualified using the correct origin
    // This handles both coverOverridePathURL (already qualified but might not have protocol)
    // and libraryItem?.thumbNailPath (might be relative)
    if (path.startsWith('/')) {
      return makePathFullyQualified({
        baseURL: assetsBaseOrigin,
        relativePath: path,
      })
    }

    return path
  }

  const syyncLessonViewer = () => {
    if (syync?.isConnected && lessonId) {
      syync
        .sendMessage('launch-lesson-viewer', {
          lessonID: lessonId,
        })
        .then(noop)
        .catch(noop)
    }
  }

  if (!hasItem) {
    // Render sales banner if no item (we'll handle this later)
    return null
  }

  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[10px] p-2.5 sm:gap-2.5 sm:p-2.5">
      {/* Top Section - Tag/Title/Description on left, Book Cover on right */}
      <div className="flex w-full flex-row items-start gap-2.5 sm:gap-2.5">
        {/* Left Wrapper - Tag, Title, Description */}
        <div className="flex min-h-[179px] w-[200px] max-w-[50%] flex-1 flex-col justify-start rounded-[10px] px-2.5 sm:min-h-[237px] sm:max-w-[50%] sm:flex-[0_0_48%] sm:px-5">
          {/* Tag Image */}
          <div className="flex justify-center pt-2.5 sm:pt-5">
            {getTagImage() && (
              <img
                src={getTagImage()}
                alt={`${subType} tag`}
                className="h-[43px] object-contain sm:h-[63px]"
              />
            )}
          </div>

          {/* Text Content */}
          <div className="flex flex-1 flex-col items-center justify-center text-center text-[8px] sm:mt-9 sm:text-[11px]">
            <h2 className="text-title mb-2 px-2.5 text-[10px] font-semibold sm:mb-0 sm:px-2.5 sm:text-base sm:leading-tight">
              {title}
            </h2>

            {/* Description - hidden on mobile */}
            <div className="hidden min-h-[40px] px-2.5 pt-2.5 text-xs leading-relaxed sm:block">
              {detailsText}
            </div>
          </div>
        </div>

        {/* Right Wrapper - Book Cover */}
        <div className="flex min-h-[179px] max-w-[50%] flex-1 flex-col justify-center rounded-[10px] px-5 py-2.5 sm:min-h-[237px] sm:max-w-[50%] sm:flex-[0_0_48%]">
          {/* Book Cover Image */}
          <div className="flex size-full items-center justify-center py-1 sm:py-2">
            <div
              className="aspect-[2/3] h-[calc(100%-0.5rem)] max-h-[180px] min-h-[190px] w-auto min-w-[80px] max-w-[120px] rounded-[3px] bg-cover bg-center bg-no-repeat sm:max-h-[210px] sm:min-h-[190px] sm:min-w-[93px] sm:max-w-[140px]"
              style={{
                backgroundColor: 'var(--grayscale-700)',
                ...(getThumbnailPath()
                  ? { backgroundImage: `url(${getThumbnailPath()})` }
                  : {}),
              }}
            >
              {/* Book cover thumbnail fills the background */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Buttons Side by Side */}
      <div className="flex w-full flex-row gap-2.5 sm:gap-2.5">
        {/* Left Button */}
        <div className="flex w-1/2">
          {subType === 'OP' ? (
            <Link
              to={url}
              className="font-body focus-visible:ring-ring bg-primary text-primary-fg hover:bg-primary-subtle hover:text-primary-subtle-fg flex h-[30px] w-full flex-row items-center justify-center gap-2 rounded text-base font-medium transition-all duration-200 ease-in focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-[40px]"
            >
              {leftButtonText}
            </Link>
          ) : (
            <Link
              to={url}
              target="_blank"
              className="font-body focus-visible:ring-ring bg-primary text-primary-fg hover:bg-primary-subtle hover:text-primary-subtle-fg flex h-[30px] w-full flex-row items-center justify-center gap-2 rounded text-base font-medium transition-all duration-200 ease-in focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-[40px]"
            >
              {leftButtonText}
              <Icon icon="download" color="current" className="ml-4" />
            </Link>
          )}
        </div>

        {/* Right Button */}
        <div className="flex w-1/2">
          <Button
            variant="primary"
            onClick={syyncLessonViewer}
            className="h-[30px] w-full sm:h-[40px]"
          >
            {rightButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
