import { useCallback, useMemo } from 'react'

import { getEncoding, makePathFullyQualified } from '@tyto/assets'
import { ActiveSession } from '@spacedock/cargo-bay'

import { Timestamp } from '@spacedock/falcon-ui'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { getTopOrigin } from '@spacedock/origins'
import type { HomeSection } from '@domain/configs'
import type { CatalogNewsSectionData } from '@domain/schemas'
import { Avatar, TextBody, TextHeading } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { useSyync } from '@spacedock/syyncronyyzed'

import { useKeyedDomainImages } from '../../hooks/useKeyedDomainImages'
import { HomeSectionWrapper } from '../home-section-wrapper/'
import type { NewsCategory } from './types'

export interface CatalogNewsProps {
  section?: HomeSection<CatalogNewsSectionData>
  sectionData: CatalogNewsSectionData
  categories: NewsCategory[]
  isLoading?: boolean
  domainID?: number
}

export const CatalogNews = ({
  section,
  categories = [],
  isLoading = false,
  domainID,
}: CatalogNewsProps) => {
  const { keyedImages } = useKeyedDomainImages({
    domainID: domainID ?? ActiveSession.domainID() ?? 0,
  })
  const syync = useSyync()

  const fallbackDomainImagePathURL = useMemo(() => {
    // ! Does not account for app being in light or Dark mode
    return (keyedImages['logo_link_DARK'] || keyedImages['logo_link'])?.pathURL
  }, [keyedImages])

  const launchLesson = useCallback(
    (lessonID: number) => {
      return syync?.sendMessage('launch-lesson-viewer', {
        lessonID,
      })
    },
    [syync],
  )

  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
    >
      <div className="flex flex-col gap-12 px-4">
        {isLoading ? (
          <CatalogNewsLoadingSkeleton />
        ) : categories.length === 0 ? (
          <TextBody className="py-8 text-center">
            No news articles found
          </TextBody>
        ) : (
          categories.map((category) => (
            <NewsCategorySection
              key={category.catalogID}
              category={category}
              fallbackImagePathURL={fallbackDomainImagePathURL}
              launchLesson={launchLesson}
            />
          ))
        )}
      </div>
    </HomeSectionWrapper>
  )
}

interface NewsCategorySectionProps {
  category: NewsCategory
  fallbackImagePathURL?: string
  launchLesson: (lessonID: number) =>
    | Promise<{
        [key: string]: unknown
      }>
    | undefined
}

const NewsCategorySection = ({
  category,
  fallbackImagePathURL,
  launchLesson,
}: NewsCategorySectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      {!category.hideTitle && (
        <TextHeading size={3} className="font-semibold">
          {category.name}
        </TextHeading>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
        {category.newsItems.map((item) => (
          <NewsItemCard
            key={item.newsID}
            item={item}
            categoryName={category.hideTitle ? item.categoryName : undefined}
            fallbackImagePathURL={fallbackImagePathURL}
            launchLesson={launchLesson}
          />
        ))}
      </div>
    </div>
  )
}

interface NewsItemCardProps {
  item: NewsCategory['newsItems'][number]
  categoryName?: string
  fallbackImagePathURL?: string
  launchLesson: (lessonID: number) =>
    | Promise<{
        [key: string]: unknown
      }>
    | undefined
}

const NewsItemCard = ({
  item,
  categoryName,
  fallbackImagePathURL,
  launchLesson,
}: NewsItemCardProps) => {
  const cardImageUrl = useMemo(() => {
    const pathURL =
      getEncoding(item.photoAsset?.encodings ?? [], 'ocDEFAULT')?.pathURL ||
      getEncoding(item.photoAsset?.encodings ?? [], 'ocTHUMBNAIL')?.pathURL

    return pathURL
      ? makePathFullyQualified({
          baseURL: getRobustOrigin(),
          relativePath: pathURL,
          includeSessionKey: true,
        })
      : undefined
  }, [item.photoAsset])

  const authorImageUrl = useMemo(() => {
    const pathURL =
      getEncoding(item.author?.photoAsset?.encodings ?? [], 'ocDEFAULT')
        ?.pathURL ||
      getEncoding(item.author?.photoAsset?.encodings ?? [], 'ocTHUMBNAIL')
        ?.pathURL

    return pathURL
      ? makePathFullyQualified({
          baseURL: getRobustOrigin(),
          relativePath: pathURL,
          includeSessionKey: true,
        })
      : undefined
  }, [item.author?.photoAsset])

  const fallbackImageUrl = useMemo(() => {
    return fallbackImagePathURL
      ? makePathFullyQualified({
          baseURL: getRobustOrigin(),
          relativePath: fallbackImagePathURL,
          includeSessionKey: true,
        })
      : undefined
  }, [fallbackImagePathURL])

  const lessonID = item.urlLessonID || item.attachmentLessonID

  const Tag = item.articleLessonID ? 'a' : item.urlLessonID ? 'button' : 'div'

  return (
    <Tag
      href={
        item.articleLessonID
          ? `${getRobustOrigin()}/v25/nl/#/news/article/${item.newsID}`
          : undefined
      }
      rel="noopener noreferrer"
      target={item.articleLessonID ? '_blank' : undefined}
      onClick={lessonID ? () => launchLesson(lessonID) : undefined}
      className="bg-bg-contrast-low text-site-fg border-outline-variant border-bg-contrast-low flex flex-col flex-col overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="from-bg-contrast-medium to-bg-contrast-low flex aspect-video w-full flex-row items-center justify-center overflow-hidden bg-gradient-to-b">
        {cardImageUrl ? (
          <img
            src={cardImageUrl}
            alt={item.headline}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={fallbackImageUrl}
            alt="domain logo"
            className="h-full w-full max-w-[80%] object-contain opacity-15"
          />
        )}
      </div>
      <div className="flex grow flex-col gap-2 p-4">
        {categoryName && (
          <span className="text-primary bg-primary/10 w-fit rounded-full px-2 py-1 text-xs font-medium">
            {categoryName}
          </span>
        )}
        <TextHeading size={4} className="line-clamp-2 font-semibold">
          {item.headline}
        </TextHeading>
        {item.summary && (
          <TextBody
            color="undefined"
            className="text-grayscale-500 line-clamp-3 text-sm"
          >
            {item.summary}
          </TextBody>
        )}
        <div className="mt-auto flex items-center gap-2">
          {item.author && (
            <Avatar
              src={authorImageUrl}
              name={item.author?.name ?? ''}
              size="md"
              className="rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            {item.author?.name && (
              <TextBody className="text-xs font-medium">
                {item.author.name}
              </TextBody>
            )}
            {item.publishDateUTC && (
              <TextBody className="text-on-surface-variant text-xs">
                <Timestamp date={item.publishDateUTC} nullDateText=" " />
              </TextBody>
            )}
          </div>

          <IconBar
            hasLessonAttachment={!!item.attachmentLessonID}
            hasUrl={!!item.urlLessonID}
          />
        </div>
      </div>
    </Tag>
  )
}

const CatalogNewsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface-variant h-8 w-48 animate-pulse rounded" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border-outline-variant overflow-hidden rounded-lg border"
          >
            <div className="bg-surface-variant aspect-video w-full animate-pulse" />
            <div className="flex flex-col gap-2 p-4">
              <div className="bg-surface-variant h-6 w-3/4 animate-pulse rounded" />
              <div className="bg-surface-variant h-4 w-full animate-pulse rounded" />
              <div className="bg-surface-variant h-4 w-2/3 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface IconBarProps {
  hasLessonAttachment: boolean
  hasUrl: boolean
}

const IconBar = (props: IconBarProps) => {
  if (!props.hasLessonAttachment && !props.hasUrl) {
    return null
  }

  return (
    <div className="ml-auto inline-flex items-center gap-2">
      {props.hasLessonAttachment && (
        <span className="bg-bg-contrast-medium rounded p-1">
          <Icon icon="paperclip" size="base" />
        </span>
      )}
      {props.hasUrl && (
        <span className="bg-bg-contrast-medium rounded p-1">
          <Icon icon="link-variant" size="base" />
        </span>
      )}
    </div>
  )
}

function getRobustOrigin() {
  const topOrigin = getTopOrigin()

  if (
    !topOrigin ||
    topOrigin === window.location.origin ||
    topOrigin.includes('localhost')
  ) {
    // Use 'http://localhost' as fallback since '/' is not a valid base URL for the URL constructor
    return EnvironmentVariables.ASSETS_BASE_URL || ''
  }

  return topOrigin
}
