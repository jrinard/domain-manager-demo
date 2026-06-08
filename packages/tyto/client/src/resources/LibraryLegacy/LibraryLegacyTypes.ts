import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  catID?: number
  catType?: string
  memberID: number
  assetMode?: unknown
}

export interface GetResponse extends TytoBaseResponse {
  categories: LibraryCategoryLegacy[]
  items: LibraryItemLegacy[]
  hasAdd: boolean
  hasDelete: boolean
  hasChange: boolean
  hasView: boolean
}

interface LibraryCategoryLegacy {
  hasAdd: boolean
  hasDelete: boolean
  hasChange: boolean
  hasView: boolean
  libraryCategoryID: number
  iconPath: string
  memberType: string
  memberID: number
  name: string
  backgroundURL: string
  cssStyle: string
  categories: LibraryCategoryLegacy[]
  items: LibraryItemLegacy[]
  description: string
  libCatIcon: LibCatIcon
}

interface LibraryItemLegacy {
  createdBy: number
  createdName: string
  createdDate: string
  iconPath: string
  isFeatured: boolean
  lessonType: string
  lessonItemType: string
  lessonName: string
  lessonID: number
  libItemID: number
  modifiedDate: string
  ratingCountStar: number
  ratingSumStar: number
  ratingMemberStar: number
  views: number
  assets: AssetItem[]
  lessonDesc: string
  hasChange: boolean
  hasDelete: boolean
  restrictOriginal: string
  images: unknown[]
  thumbNailPath: string
}

interface LibCatIcon {
  pathURL: string
  height: number
  width: number
  imageID: number
}

interface AssetItem {
  Capacity: number
  Count: number
  Item: Asset
}

interface Asset {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: string
  orientation: string
  modifiedDate: string
  modifiedByID: number
  createdDate: string
  createdByID: number
  createdByName: string
  sequence: number
  softwareRequirements: string
  originalMD5: string
  domainID: number
  encodings: Encoding[]
  activeStatus: string
  courseItemID: number
  languageTag: string
}

interface Encoding {
  activeStatus: keyof typeof ActiveStatus
  encodingType: keyof typeof EncodingType
  height: number
  length: number
  mimeType: string
  modifiedDate: string
  pathURL: string
  sizeBytes: number
  techNote: string
  width: number
}

enum EncodingType {
  ocCAPTION,
  ocORIGINAL = 'ocORIGINAL',
  ocDEFAULT = 'ocDEFAULT',
  ocTHUMBNAIL = 'ocTHUMBNAIL',
  ocSMALL = 'ocSMALL',
  ocMEDIUM = 'ocMEDIUM',
  ocLARGE = 'ocLARGE',
  'ocPDFJSON/jsthumb' = 'ocPDFJSON/jsthumb',
  'ocPDFJSON/jspage' = 'ocPDFJSON/jspage',
  'ocPDFJSON/jspageimg' = 'ocPDFJSON/jspageimg',
  'ocPDFIMAGES/thumbtmp' = 'ocPDFIMAGES/thumbtmp',
  'ocPDFIMAGES/imgtmp' = 'ocPDFIMAGES/imgtmp',
  'ocHLSORIGINAL' = 'ocHLSORIGINAL',
}

enum ActiveStatus {
  ocENABLED = 'ocENABLED',
  ocDISABLED = 'ocDISABLED',
  ocTRANSCODE99 = 'ocTRANSCODE99',
}
