import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  activeStatus?: string
  name?: string
  teamPath?: string
  hasChange?: boolean
  isContainerUnit?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  result: result
}
export interface result {
  blocks: Block[]
  authors: Author[]
}

export interface Block {
  blockID: number
  courseIdentifier: string
  teamRoot: number
  expirationDate: DateISO8601
  hasChangeAccess: boolean
  hasDeleteAccess: boolean
  isContainerUnit: boolean
  countRequisite: number
  internalTitle: string
  name: string
  locID: number
  ocType: 'ocBLOCK'
  elementID: number
  elementName: string
  elementDesc: string
  elementType: string
  elementSubType: string
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: DateISO8601
  primaryElementID: number
  mainTitle?: string //Extra Long Title
  modifiedByID: number
  modifiedDate: DateISO8601
  shareChangedDate: DateISO8601
  shareChangedByID: number
  activeStatus: 'ocDISABLED' | 'ocENABLED'
  profileImage?: ProfileImage
  profileImageFeatured?: ProfileImage
}

export interface Author {
  elementID: number
  elementName: string
  activeStatus: 'ocDISABLED' | 'ocENABLED'
  elementType: 'ocPERSON' | 'ocTEAM'
}

export interface ProfileImage {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: string
  orientation: string
  modifiedDate: DateISO8601
  modifiedByID: number
  createdDate: DateISO8601
  createdByID: number
  createdByName: string
  sequence: number
  softwareRequirements: string
  originalMD5: string
  domainID: number
  encodings: Encoding[]
  courseItemID: number
}

export interface Encoding {
  encodingType: string
  mimeType: string
  modifiedDate: DateISO8601
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: string
  pathURL: string
}
