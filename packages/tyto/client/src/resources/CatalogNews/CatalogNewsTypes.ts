import { TytoBaseResponse } from '@tyto/manifest'
import { Data } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  parentCatalogID?: number
  primaryElementIDs?: number[]
  showExpired?: boolean
  catalogPathName?: string
  topItem?: number
  itemActiveStatus?: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  catalogs: CatalogContainer[]
  primaryElements: CatalogPrimaryElement[]
}

interface CatalogPrimaryElement {
  teamID: number
  subDomainParentNamePath: string
  parentNamePath: string
  teamName: string
  iPath: string
}

interface CatalogContainer {
  activeStatus: string
  catalogID: number
  catalogItemID: number
  catalogItemSubType: 'ocCONTAINER'
  catalogItemType: 'ocCATALOG'
  catalogType: 'ocNEWS'
  childContainers: CatalogContainer[]
  childItems: CatalogItem[]
  createdByID: number
  createdDate: string
  description: string
  domainID: number
  hasAdd: true
  hasChange: boolean
  hasDelete: boolean
  images: Data.LessonImage[]
  locID: number
  modifiedByID: number
  modifiedDate: string
  name: string
  ocType: 'ocELEMENT'
  outsideID: string
  parentCatalogID: number
  pathIDs: string
  pathName: string
  primaryElementID: number
  primaryElementTreeSerialLeft: number
  siblingSeq: number
  thumbnailPath: string
}

interface CatalogItem {
  about: {
    catalogIDs: number[]
    bannerImageAsset: Data.ProfileImageAsset | null
    photoAsset: Data.ProfileImageAsset | null
    ocType: 'ocNEWS'
    summary: string
    newsType: 'ocITEM2015'
    newsID: number
    headline: string
    articleLessonID: number
    attachmentLessonID: number
    urlLessonID: number
    photoAssetID: number
    photoAlbumLessonID: number
    category: string
    expiresDateUTC: string
    displayInPopup: boolean
    countPopupsDismissed: number
    author: {
      name: string
      title: string
      authorID: number
      photoAsset: Data.ProfileImageAsset | null
    }
    publicKey: string
    isPublic: boolean
    countShare: number
    countLike: number
    countNotice: number
    lastComponentModifier: {
      when: string
      ID: number
    }
    publishDateUTC: string
    name: string
    locID: number
    domainID: number
    outsideID: string
    createdByID: number
    createdDate: string
    primaryElementID: number
    modifiedByID: number
    modifiedDate: string
    shareChangedDate: string
    shareChangedByID: number
    activeStatus: 'ocENABLED'
  }
  catalogID: number
  description: string
  catalogType: 'ocNEWS'
  parentCatalogID: number
  primaryElementTreeSerialLeft: number
  pathName: string
  pathIDs: string
  thumbnailPath: string
  catalogItemID: number
  catalogItemType: 'ocNEWS'
  catalogItemSubType: 'ocITEM2015'
  hasChange: boolean
  hasAdd: boolean
  hasDelete: boolean
  siblingSeq: number
  name: string
  locID: number
  ocType: 'ocELEMENT'
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: string
  primaryElementID: number
  modifiedByID: number
  modifiedDate: string
  activeStatus: 'ocENABLED'
}
