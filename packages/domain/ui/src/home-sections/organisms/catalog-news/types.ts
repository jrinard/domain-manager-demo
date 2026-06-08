import type { Data } from '@spacedock/manifest'

export interface NewsItem {
  activeStatus: string
  headline: string
  summary: string
  newsID: number
  catalogIDs: number[]
  profileImage: Data.ProfileImageAsset | null
  categoryName: string
  primaryElementID: number
  author: {
    name: string
    title: string
    authorID: number
    photoAsset: Data.ProfileImageAsset | null
  }
  articleLessonID: number
  attachmentLessonID: number
  urlLessonID: number
  isPublic: boolean
  countLike: number
  countNotice: number
  countPopupsDismissed: number
  countShare: number
  displayInPopup: boolean
  photoAlbumLessonID: number
  photoAssetID: number
  photoAsset: Data.ProfileImageAsset | null
  bannerImageAsset: Data.ProfileImageAsset | null
  publishDateUTC: string
  modifiedDate: string
}

export interface NewsCategory {
  catalogID: number
  name: string
  hasAdd: boolean
  hasChange: boolean
  hasDelete: boolean
  newsItems: NewsItem[]
  hideTitle?: boolean
}

