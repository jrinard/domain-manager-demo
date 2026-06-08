import { useMemo } from 'react'
import type { HomeSection } from '@domain/configs'
import type { CatalogNewsSectionData } from '@domain/schemas'
import { useCatalogNewsQuery } from '@tyto/query'
import { CatalogNews } from './CatalogNews'
import type { NewsCategory, NewsItem } from './types'

export interface CatalogNewsDataProps {
  section?: HomeSection<CatalogNewsSectionData>
  sectionData: CatalogNewsSectionData
  domainID: number
}

export const CatalogNewsDataComponent = ({
  section,
  sectionData,
  domainID,
}: CatalogNewsDataProps) => {
  const catalogNewsQuery = useCatalogNewsQuery({
    primaryElementIDs: [domainID],
    disabled: !domainID,
  })

  const categories = useMemo(() => {
    if (!catalogNewsQuery.data?.catalogs) {
      return []
    }

    const {
      category_sort = 'group-by-category',
      sort = 'publish-date',
      newsCategoryID,
    } = sectionData

    // Process catalogs and their child items into NewsCategory format
    const processedCategories: NewsCategory[] = []

    catalogNewsQuery.data.catalogs.forEach((catalog) => {
      // If categoryID is specified, filter to only that category
      if (!!newsCategoryID && catalog.catalogID !== newsCategoryID) {
        return
      }

      const newsItems: NewsItem[] = catalog.childItems.map((item) => ({
        activeStatus: item.about.activeStatus,
        headline: item.about.headline,
        summary: item.about.summary,
        newsID: item.about.newsID,
        catalogIDs: item.about.catalogIDs,
        profileImage: null,
        categoryName: catalog.name,
        primaryElementID: item.about.primaryElementID,
        author: item.about.author,
        articleLessonID: item.about.articleLessonID,
        attachmentLessonID: item.about.attachmentLessonID,
        urlLessonID: item.about.urlLessonID,
        isPublic: item.about.isPublic,
        countLike: item.about.countLike,
        countNotice: item.about.countNotice,
        countPopupsDismissed: item.about.countPopupsDismissed,
        countShare: item.about.countShare,
        displayInPopup: item.about.displayInPopup,
        photoAlbumLessonID: item.about.photoAlbumLessonID,
        photoAssetID: item.about.photoAssetID,
        photoAsset: item.about.photoAsset,
        bannerImageAsset: item.about.bannerImageAsset,
        publishDateUTC: item.about.publishDateUTC,
        modifiedDate: item.about.modifiedDate,
      }))

      // Sort news items based on the sort property
      const sortedNewsItems = sortNewsItems(newsItems, sort)

      processedCategories.push({
        catalogID: catalog.catalogID,
        name: catalog.name,
        hasAdd: catalog.hasAdd,
        hasChange: catalog.hasChange,
        hasDelete: catalog.hasDelete,
        newsItems: sortedNewsItems,
      })
    })

    // Handle category_sort - if 'show-category-as-tag', flatten all items into one category
    if (category_sort === 'show-category-as-tag') {
      const allNewsItems: NewsItem[] = processedCategories.flatMap(
        (cat) => cat.newsItems,
      )
      const sortedAllItems = sortNewsItems(allNewsItems, sort)

      return [
        {
          catalogID: -1,
          name: section?.metadata?.display_name || 'News',
          hasAdd: false,
          hasChange: false,
          hasDelete: false,
          newsItems: sortedAllItems,
          hideTitle: true,
        },
      ]
    }

    // Sort categories alphabetically by name if grouped by category
    return processedCategories.sort((a, b) => a.name.localeCompare(b.name))
  }, [catalogNewsQuery.data, sectionData, section?.metadata?.display_name])

  return (
    <CatalogNews
      section={section}
      sectionData={sectionData}
      categories={categories}
      isLoading={catalogNewsQuery.isPending}
      domainID={domainID}
    />
  )
}

function sortNewsItems(
  items: NewsItem[],
  sort: 'alphabetical' | 'publish-date',
): NewsItem[] {
  if (sort === 'alphabetical') {
    return [...items].sort((a, b) => a.headline.localeCompare(b.headline))
  }

  // Default to publish-date (newest first)
  return [...items].sort((a, b) => {
    const dateA = new Date(a.publishDateUTC).getTime()
    const dateB = new Date(b.publishDateUTC).getTime()
    return dateB - dateA
  })
}
