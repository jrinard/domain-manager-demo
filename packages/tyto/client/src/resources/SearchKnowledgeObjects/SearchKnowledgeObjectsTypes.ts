import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  domainID?: number
  searchString: string
  elementTypes?: string
  cacheTimeOutMinutes?: number
  top?: number
  filterRank?: number
  filterDateStart?: string
  lessonItemTypes?: string
  elementSubTypes?: string
  getImages?: boolean
}

export interface GetResponse extends TytoBaseResponse {
  result: SearchKnowledgeObjectResult
}
export interface SearchKnowledgeObjectResult {
  resultCountTotal: number
  results: SearchKnowledgeObjectResultItem[]
}

export interface SearchKnowledgeObjectResultItem {
  relevanceRank: number
  scoreKeyWord: number
  scoreElementName: number
  scoreElementDescription: number
  scoreContent: number
  scoreTotal: number
  scorehit: number
  scoreContainsAll: number
  hasDelete: boolean
  hasChange: boolean
  permissionSources: { [key: string]: boolean }
  assets?: Asset[]
  starRating: StarRating
  element: Element
}

export interface Asset {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: string
  orientation: string
  modifiedDate: Date
  modifiedByID: number
  createdDate: Date
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
  modifiedDate: Date
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: string
  pathURL: string
}

export interface Element {
  name: string
  locID: number
  ocType: string
  elementID: number
  elementName: string
  elementDesc: string
  elementType: string
  elementSubType: string
  domainID: number
  createdByID: number
  createdDate: Date
  primaryElementID: number
  modifiedDate: Date
  createdBy: CreatedBy
}

export interface CreatedBy {
  name: string
  ocType: string
  elementName: string
}

export interface StarRating {
  sessionUsersRating: number
  sumAllRatings: number
  countRatings: number
}

export interface Album {
  name: string
  artist: ArtistClass
  tracks: Track[]
}

export interface ArtistClass {
  name: string
  founded: number
  members: string[]
}

export interface Track {
  name: string
  duration: number
}

export interface PostParameters {
  searchID: number
  elementID: number
  relevanceRank: number
  scoreKeyWord: number
  scoreElementName: number
  scoreElementDescription: number
  scoreContent: number
  scoreTotal: number
  scoreHit: number
  scoreContainsAll: number
}
export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
}
