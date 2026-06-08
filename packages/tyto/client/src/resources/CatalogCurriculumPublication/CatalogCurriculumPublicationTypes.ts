import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

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
  isShallowKeepAlive?: boolean
}

export interface GetResponse extends TytoBaseResponse {
  catalogs: Catalog[]
}

export interface Catalog {
  activeStatus: ActiveStatus
  catalogID: number
  catalogItemID: number
  catalogItemSubType: string
  catalogItemType: string
  catalogType: string
  childContainers?: ChildContainer[]
  childItems: ChildItem[]
  createdByID: number
  createdDate: DateISO8601
  description: string
  domainID: number
  hasChange: boolean
  hasAdd: boolean
  hasDelete: boolean
  images?: any[]
  locID: number
  modifiedByID: number
  modifiedDate: DateISO8601
  name: string
  ocType: string
  outsideID: string
  parentCatalogID: number
  pathIDs: string
  pathName: string
  primaryElementID: number
  primaryElementTreeSerialLeft: number
  siblingSeq: number
  thumbnailPath: string
  restrictedAdd: boolean
  restrictedChange: boolean
  restrictedDelete: boolean
  restrictedShare: boolean
  restrictedView: boolean
  virtualUnnested: boolean
  strikeName: boolean
}

export interface ChildContainer {
  activeStatus: ActiveStatus
  catalogID: number
  catalogItemID: number
  catalogItemSubType: string
  catalogItemType: string
  catalogType: string
  childContainers: ChildContainer[]
  childItems: ChildItem[]
  createdByID: number
  createdDate: string
  description: string
  domainID: number
  hasAdd: boolean
  hasChange: boolean
  hasDelete: boolean
  images: any[]
  locID: number
  modifiedByID: number
  modifiedDate: string
  ocType: string
  outsideID: string
  parentCatalogID: number
  pathIDs: string
  pathName: string
  primaryElementID: number
  primaryElementTreeSerialLeft: number
  siblingSeq: number
  thumbnailPath: string
}
export interface ChildItem {
  activeStatus?: ActiveStatus
  about?: About
  catalogID: number
  catalogItemID: number
  catalogItemSubType: string
  catalogItemType: string
  catalogType: string
  createdByID: number
  createdDate: string
  description: string
  domainID: number
  hasAdd: boolean
  hasChange: boolean
  hasDelete: boolean
  images?: any[]
  locID: number
  modifiedByID: number
  modifiedDate: string
  name: string
  ocType: string
  outsideID: string
  parentCatalogID: number
  pathIDs: string
  pathName: string
  primaryElementID: number
  primaryElementTreeSerialLeft: number
  siblingSeq: number
  thumbnailPath: string
}

export interface About {
  catalogIDs: number[]
  curriculumPublicationID: number
  beginDate: string
  expiresDate: string
  curriculumID: number
  curriculumType: string
  curriculum: Curriculum
  name: string
  locID: number
  ocType: string
  elementID: number
  elementName: string
  elementDesc: string
  elementType: string
  elementSubType: string
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: string
  primaryElementID: number
  modifiedByID: number
  modifiedDate: string
  shareChangedDate: string
  shareChangedByID: number
  activeStatus: ActiveStatus
}

export type ActiveStatus = 'ocENABLED' | 'ocDISABLED' | 'ocVACANT'

export interface Curriculum {
  catalogIDs: any[]
  blockID: number
  courseIdentifier: string
  teamRoot: number
  expirationDate: Date | string
  profileImage?: ProfileImage
  profileImageFeatured?: ProfileImage
  products: any[]
  author: Author
  audienceDesc: string
  difficultyDesc: string
  expectationDesc: string
  durationEstimate: string
  isContainerUnit: boolean
  internalTitle: string
  name: string
  locID: number
  ocType: string
  elementID: number
  elementName: string
  elementDesc: string
  elementType: string
  elementSubType: string
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: Date | string
  primaryElementID: number
  modifiedByID: number
  modifiedDate: Date | string
  shareChangedDate: Date | string
  shareChangedByID: number
  activeStatus: ActiveStatus
}

export interface Author {
  name: string
  title: string
  authorID: number
  photoAsset?: ProfileImage
}

export interface ProfileImage {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: AssetType
  orientation: 'ocVOID'
  modifiedDate: Date | string
  modifiedByID: number
  createdDate: Date | string
  createdByID: number
  createdByName: string
  sequence: number
  softwareRequirements: string
  originalMD5: string
  domainID: number
  encodings: Encoding[]
  courseItemID: number
}

export type AssetType = 'ocPhoto' | 'ocProfilePhoto'

export interface Encoding {
  encodingType: EncodingType
  mimeType: 'image/jpeg' | 'image/png'
  modifiedDate: Date | string
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: ActiveStatus
  pathURL: string
}

export type EncodingType = 'ocDEFAULT' | 'ocORIGINAL' | 'ocTHUMBNAIL'
export interface PutParameters {
  catalogID: number
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: -1
}
