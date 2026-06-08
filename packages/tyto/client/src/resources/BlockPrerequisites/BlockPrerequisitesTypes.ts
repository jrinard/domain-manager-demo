import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  blockID: number
}

export interface GetResponse extends TytoBaseResponse {
  prerequisites: Prerequisite[]
}

export interface Prerequisite {
  assets: Asset[]
  aboutID: number
  activeStatus: string
  courseItemStatus: string
  createdBy: number
  createdDate: string
  createdName: string
  creditUnitDesc: string
  creditUnits: number
  isCredit: boolean
  isDemo: boolean
  isOptional: boolean
  isResource: boolean
  itemDescription: string
  itemName: string
  itemSubtype: keyof typeof ItemType | keyof typeof ItemSubType
  itemType: keyof typeof ItemType
  masteryScore: number
  parentID: number
  prerequisiteID: number
  prerequisiteName: string
  prerequisiteType: keyof typeof PrerequisiteType
  sequence: number
  setCompletion: number
  setStatus: number
  images: LessonImage[]
  expirationDate: string
}

interface Asset {
  assetDesc: string
  assetID: number
  assetName: string
  assetType: string
  courseItemID: number
  createdByID: number
  createdByName: string
  createdDate: string
  domainID: number
  encodings: Encoding[]
  modifiedByID: number
  modifiedDate: string
  orientation: string
  originalMD5: string
  sequence: number
  softwareRequirements: string
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

interface LessonImage {
  height: number
  imageName: string
  originalMimeType: string
  pathURL: string
  width: number
}

enum PrerequisiteType {
  ocELEARNING = 'ocELEARNING',
}

enum ItemType {
  ocASSIGNMENT = 'ocASSIGNMENT',
  ocDOCUMENT = 'ocDOCUMENT',
  ocEXAMTASK = 'ocEXAMTASK',
  ocImage = 'ocImage',
  ocLESSON = 'ocLESSON',
  ocPhoto = 'ocPhoto',
  ocPHOTOALBUM = 'ocPHOTOALBUM',
  ocELEARNING = 'ocELEARNING',
  ocSCORM = 'ocSCORM',
  ocSpreadsheet = 'ocSpreadsheet',
  ocURL = 'ocURL',
  ocVIDEO = 'ocVIDEO',
  ocVideo = 'ocVideo',
  ocBLOCK = 'ocBLOCK',
  ocTASK = 'ocTASK', // * NOTE: No actual example of a task inside a Course
}

enum ItemSubType {
  ocASSIGNMENT = 'ocASSIGNMENT',
  ocLESSON = 'ocLESSON',
  ocPhoto = 'ocPhoto',
  ocSCORM = 'ocSCORM',
  ocSpreadsheet = 'ocSpreadsheet',
  ocURL = 'ocURL',
  ocExam = 'ocExam',
  ocSurvey = 'ocSurvey',
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
