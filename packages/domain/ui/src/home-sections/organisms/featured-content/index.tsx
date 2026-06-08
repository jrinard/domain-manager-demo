import type {
  SectionRenderMode,
  FeaturedContentSection as FeaturedContentSectionType,
} from '@domain/configs'
import type { FeaturedContentSectionData } from '@domain/schemas'
import type { LibraryTeamFeatured } from '@tyto/query'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type { DomainUI } from '@spacedock/manifest'
import { TextBody, TextHeading } from '@spacedock/falcon-ui'
import { useLibraryTeamFeaturedQuery } from '@tyto/query'
import { FeaturedContentItem } from './FeaturedContentItem'
import { getMockFeaturedContentData } from './mockData'
import { useMemo } from 'react'

export interface FeaturedContentSectionProps {
  section: FeaturedContentSectionType | null
  dynamic_section_data?: FeaturedContentSectionType['dynamic_section_data']
  attachments?: DomainUI.Attachment[]
  renderMode?: SectionRenderMode
  domainID?: number
}

export const FeaturedContentSection = ({
  section,
  attachments,
  renderMode = 'prod',
  domainID,
}: FeaturedContentSectionProps) => {
  const sectionData = (section?.section_data || {}) as FeaturedContentSectionData
  const {
    title,
    showTitle = true,
    columnCount = 3,
    maxItems = 12,
  } = sectionData

  // Fetch featured library items (only in prod mode)
  const {
    data: realFeaturedItems = [],
    isLoading,
    error,
  } = useLibraryTeamFeaturedQuery({
    assetMode: 'ocALL',
    top: maxItems,
    isEnabled: renderMode !== 'mock',
  })

  // Use mock data in edit/mock mode, real data in prod/preview mode
  const featuredItems = useMemo(() => {
    if (renderMode === 'mock') {
      return getMockFeaturedContentData()
    }
    // Ensure we have an array - handle potential nested response structure
    if (Array.isArray(realFeaturedItems)) {
      return realFeaturedItems
    }
    // Handle case where API might return nested structure
    if (
      realFeaturedItems &&
      typeof realFeaturedItems === 'object' &&
      'libraryTeamFeatured' in realFeaturedItems
    ) {
      return (realFeaturedItems as any).libraryTeamFeatured || []
    }
    return []
  }, [renderMode, realFeaturedItems, isLoading, error])

  const cardMinWidth = 'min-w-[180px]'

  if (!section || !section.section_data) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      attachments={attachments}
      padding="lg"
    >
      <div className="flex w-full flex-col gap-4">
        {/* Title */}
        {showTitle && (
          <TextHeading size={3} className="text-grayscale-100">
            {title || 'Featured Content'}
          </TextHeading>
        )}

        {/* Loading State (only show in prod mode, not mock) */}
        {isLoading && renderMode !== 'mock' && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: Math.max(columnCount, 4) }).map((_, i) => (
              <div
                key={i}
                className={`${cardMinWidth} bg-grayscale-700 aspect-video flex-shrink-0 animate-pulse rounded-lg`}
              />
            ))}
          </div>
        )}

        {/* Error State (only show in prod mode, not mock) */}
        {error && !isLoading && renderMode !== 'mock' && (
          <TextBody className="text-grayscale-400">
            Failed to load featured content
          </TextBody>
        )}

        {/* Items - horizontal scrolling container with at least 4 visible */}
        {((!isLoading && !error) || renderMode === 'mock') &&
          featuredItems.length > 0 && (
            <div className="scrollbar-thin scrollbar-thumb-grayscale-600 scrollbar-track-grayscale-800 flex w-full gap-4 overflow-x-auto pb-2">
              {featuredItems
                .slice(0, maxItems)
                .map((item: LibraryTeamFeatured, index: number) => {
                  // Ensure item has required properties
                  if (!item || !item.aboutID) {
                    return null
                  }
                  return (
                    <div
                      key={`${item.aboutID}-${index}`}
                      className={`${cardMinWidth} flex-shrink-0`}
                    >
                      <FeaturedContentItem
                        item={item}
                        renderMode={renderMode}
                      />
                    </div>
                  )
                })}
            </div>
          )}

        {/* Debug info in preview mode */}
        {renderMode === 'prod' &&
          featuredItems.length === 0 &&
          !isLoading &&
          !error && (
            <TextBody className="text-grayscale-400 text-xs">
              No featured items available. Check console for details.
            </TextBody>
          )}

        {/* Empty State */}
        {!isLoading && !error && featuredItems.length === 0 && (
          <TextBody className="text-grayscale-400">
            No featured content available
          </TextBody>
        )}
      </div>
    </HomeSectionWrapper>
  )
}
