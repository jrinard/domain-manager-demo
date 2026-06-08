import type { HomeSection } from '@domain/configs'
import type { CatalogNewsSectionData } from '@domain/schemas'
import { CatalogNews } from './CatalogNews'
import type { NewsCategory } from './types'

export interface CatalogNewsMockDataProps {
  section: HomeSection<CatalogNewsSectionData>
  sectionData: CatalogNewsSectionData
}

const MOCK_CATEGORIES: NewsCategory[] = [
  {
    catalogID: 1,
    name: 'Company Updates',
    hasAdd: false,
    hasChange: false,
    hasDelete: false,
    newsItems: [
      {
        activeStatus: 'ocENABLED',
        headline: 'Quarterly Results Exceed Expectations',
        summary: 'Our team delivered outstanding results this quarter, surpassing all key metrics and setting new records for customer satisfaction.',
        newsID: 101,
        catalogIDs: [1],
        profileImage: null,
        categoryName: 'Company Updates',
        primaryElementID: 1001,
        author: {
          name: 'Sarah Johnson',
          title: 'CEO',
          authorID: 1,
          photoAsset: null,
        },
        articleLessonID: 0,
        attachmentLessonID: 0,
        urlLessonID: 0,
        isPublic: true,
        countLike: 45,
        countNotice: 120,
        countPopupsDismissed: 0,
        countShare: 15,
        displayInPopup: false,
        photoAlbumLessonID: 0,
        photoAssetID: 0,
        photoAsset: null,
        bannerImageAsset: null,
        publishDateUTC: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedDate: new Date().toISOString(),
      },
      {
        activeStatus: 'ocENABLED',
        headline: 'New Office Opening in Austin',
        summary: 'We are excited to announce the opening of our new regional headquarters in Austin, Texas.',
        newsID: 102,
        catalogIDs: [1],
        profileImage: null,
        categoryName: 'Company Updates',
        primaryElementID: 1002,
        author: {
          name: 'Michael Chen',
          title: 'COO',
          authorID: 2,
          photoAsset: null,
        },
        articleLessonID: 0,
        attachmentLessonID: 0,
        urlLessonID: 0,
        isPublic: true,
        countLike: 32,
        countNotice: 85,
        countPopupsDismissed: 0,
        countShare: 8,
        displayInPopup: false,
        photoAlbumLessonID: 0,
        photoAssetID: 0,
        photoAsset: null,
        bannerImageAsset: null,
        publishDateUTC: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedDate: new Date().toISOString(),
      },
    ],
  },
  {
    catalogID: 2,
    name: 'Training & Development',
    hasAdd: false,
    hasChange: false,
    hasDelete: false,
    newsItems: [
      {
        activeStatus: 'ocENABLED',
        headline: 'New Leadership Training Program Launches',
        summary: 'Enroll now in our comprehensive leadership development program designed to help you grow your management skills.',
        newsID: 201,
        catalogIDs: [2],
        profileImage: null,
        categoryName: 'Training & Development',
        primaryElementID: 2001,
        author: {
          name: 'Emily Rodriguez',
          title: 'Director of Training',
          authorID: 3,
          photoAsset: null,
        },
        articleLessonID: 0,
        attachmentLessonID: 0,
        urlLessonID: 0,
        isPublic: true,
        countLike: 67,
        countNotice: 200,
        countPopupsDismissed: 0,
        countShare: 25,
        displayInPopup: false,
        photoAlbumLessonID: 0,
        photoAssetID: 0,
        photoAsset: null,
        bannerImageAsset: null,
        publishDateUTC: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedDate: new Date().toISOString(),
      },
    ],
  },
]

export const CatalogNewsMockData = ({
  section,
  sectionData,
}: CatalogNewsMockDataProps) => {
  // Apply the same sorting logic as the real data component for consistency
  const { category_sort = 'group-by-category', sort = 'publish-date' } = sectionData

  let categories = [...MOCK_CATEGORIES]

  // Sort items within each category
  categories = categories.map((cat) => ({
    ...cat,
    newsItems: sortNewsItems([...cat.newsItems], sort),
  }))

  // Handle category_sort
  if (category_sort === 'show-category-as-tag') {
    const allNewsItems = categories.flatMap((cat) => cat.newsItems)
    categories = [{
      catalogID: -1,
      name: section.metadata?.display_name || 'News',
      hasAdd: false,
      hasChange: false,
      hasDelete: false,
      newsItems: sortNewsItems(allNewsItems, sort),
      hideTitle: true,
    }]
  }

  return (
    <CatalogNews
      section={section}
      sectionData={sectionData}
      categories={categories}
      isLoading={false}
    />
  )
}

function sortNewsItems(items: typeof MOCK_CATEGORIES[0]['newsItems'], sort: 'alphabetical' | 'publish-date') {
  if (sort === 'alphabetical') {
    return items.sort((a, b) => a.headline.localeCompare(b.headline))
  }
  return items.sort((a, b) => new Date(b.publishDateUTC).getTime() - new Date(a.publishDateUTC).getTime())
}

