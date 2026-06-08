export type BlockLogic = 'ocANYORDER'

export interface PrerequisiteEnrollment {
  preRequisiteID: number
  blockID: number
  sequence: number
  isResource: boolean
  isOptional: boolean
  contentLengthDesc: string
  curriculum: PrerequisiteEnrollmentCurriculum
  enrollment: Enrollment
  name: string
  subRequisites?: SubRequisite[]
}

export interface PrerequisiteEnrollmentCurriculum {
  images?: unknown[]
  blockLogic?: BlockLogic
  name: string
  locID: number
  ocType: Type
  elementID: number
  elementName: string
  elementDesc: string
  elementType: Type
  elementSubType: ElementSubType
  assets?: Asset[]
  activeStatus: ActiveStatus
}

export type ActiveStatus = 'ocENABLED'

export interface Asset {
  assetID: number
  assetName: string
  assetDesc: AssetDesc
  assetType: AssetAssetType
  orientation: Orientation
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

export type AssetDesc = 'profileImageID' | ''

export type AssetAssetType = 'ocProfilePhoto' | 'ocVideo' | 'ocPDF'

export interface Encoding {
  encodingType: EncodingType
  mimeType: MIMEType
  modifiedDate: Date
  height: number
  width: number
  length: number
  sizeBytes: number
  activeStatus: ActiveStatus
  pathURL: string
}

export type EncodingType = 'ocTHUMBNAIL'

export type MIMEType = 'image/jpeg'

export type Orientation = 'ocVOID'

export type ElementSubType = 'ocITEM' | 'ocSurvey'

export type Type = 'ocBLOCK' | 'ocEXAMTASK'

export interface Enrollment {
  ocType: EnrollmentOcType
  memberID: number
  completeStatus: CompleteStatus
  passStatus: PassStatus
  score: number
  bookMark: BookMark
  cummAttempts: number
  cummTime: Date
  sessionTime: Date
  lastDate: Date
  isLaunchable: boolean
  enrollmentID: number
  locID: number
}

export type BookMark = '' | '227s'

export type CompleteStatus = 'ocINCOMPLETE' | 'ocNOTATTEMPTED' | 'ocCOMPLETE'

export type EnrollmentOcType = 'ocENROLLMENT'

export type PassStatus = 'ocVACANT'

export interface SubRequisite {
  preRequisiteID: number
  blockID: number
  sequence: number
  isResource: boolean
  isOptional: boolean
  contentLengthDesc: string
  curriculum: SubRequisiteCurriculum
  enrollment: Enrollment
  name: string
}

export interface SubRequisiteCurriculum {
  images: unknown[]
  ocType: CurriculumOcType
  lessonID: number
  assetType: CurriculumAssetType
  lessonItemType: ItemType
  itemType: ItemType
  lessonName: string
  lessonDesc: string
  maxBrowse: number
  isCredit: boolean
  isAnswerKey: boolean
  name: string
  locID: number
  assets?: Asset[]
  activeStatus: ActiveStatus
}

export type CurriculumAssetType = 'ocVideo' | 'ocPDF' | 'ocASSIGNMENT'

export type ItemType = 'ocVIDEO' | 'ocDOCUMENT' | 'ocASSIGNMENT'

export type CurriculumOcType = 'ocLESSON'
