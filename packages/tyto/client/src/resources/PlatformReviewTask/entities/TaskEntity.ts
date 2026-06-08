import { DateISO8601 } from '@tyto/manifest'

export interface TaskEntity {
  tasks: TaskElement[]
  taskRelations: TaskRelation[]
  members: TopMember[]
  delegateParticipationRoles: string[]
}

export interface TopMember {
  mentors: unknown[]
  memberID: number
  memberName: string
  locID: number
  ocType: string
  domainID: number
  primaryElementID: number
  activeStatus: string
}

export interface TaskRelation {
  parentTaskID: number
  childTaskID: number
  seq: number
  rootTaskID: number
}

export interface TaskElement {
  countcompletechildren: number
  countallchildren: number
  locID: number
  name: string
  ocType: OcType
  taskID: number
  taskName: string
  taskDesc: string
  taskType: TaskType
  memberID: number
  mentorID: number
  recurrenceID: number
  completionNote: string
  taskStatus: TaskStatus
  taskStatusDate: DateISO8601
  completedByID: number
  dueDate: DateISO8601
  createdByID: number
  createdDate: DateISO8601
  modifiedByID: number
  modifiedDate: DateISO8601
  aboutID: number
  aboutType: Type
  daysUntilDueFromSiblingCompletion: number
  devplanStepID: number
  areChildrenSequential: boolean
  isCompletionOptional: boolean
  percentComplete: number
  setStatus: number
  attemptCountMax: number
  attemptCount: number
  attemptLastStatus: AttemptLastStatus
  rootTaskID: number
  startDate: DateISO8601
  durationMinutes: number
  initialStartDate: DateISO8601
  about?: About
  completedAsOfDate: DateISO8601
  taskStatusByID: number
  isConfidential: boolean
  members: Member[]
  verifierTasks: unknown[]
  permission: Permission
}

export interface About {
  devplanMasterID: number
  name: string
  locID: number
  ocType: Type
  elementName: string
  elementDesc: string
  elementType: Type
  elementSubType: string
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: DateISO8601
  primaryElementID: number
  modifiedByID: number
  modifiedDate: DateISO8601
  libraryItemCount: number
  assets: unknown[]
  activeStatus: string
  library?: Library
}

export interface Library {
  items: Item[]
  categories: Category[]
}

export interface Category {
  categoryName: string
  createdByID: number
  createdDate: DateISO8601
  isFeatured: boolean
  libraryCategoryID: number
  memberID: number
  modifiedByID: number
  modifiedDate: DateISO8601
  hasView: boolean
  hasAdd: boolean
  hasChange: boolean
  hasDelete: boolean
}

export interface Item {
  sequence: number
  libraryID: number
  memberID: number
  courseItemID: number
  createdDate: DateISO8601
  createdBy: number
  description: string
  activeStatus: ActiveStatus
  libraryCategoryID: number
  isFeatured: boolean
  thumbNailPath: string
  courseItem: CourseItem
  member: CourseItem
  lesson: Lesson
}

export type CourseItem = object

export type Type = 'ocDEVPLAN' | ''

export type AttemptLastStatus = 'ocVACANT'

export type OcType = 'ocTASK'

export interface Permission {
  hasView: boolean
  hasConfidentialView: boolean
  hasChangeStatus: boolean
  hasChangeStructure: boolean
  hasChangeExpectation: boolean
  hasChangeDelegate: boolean
}

export type TaskStatus = 'ocNOTSTARTED' | 'ocCOMPLETE' | 'ocINCOMPLETE'

export type TaskType = 'ocCONTAINER' | 'ocITEM'

export interface Lesson {
  catalogIDs: unknown[]
  images: unknown[]
  ocType: LessonOcType
  lessonID: number
  assetType: AssetType
  lessonItemType: ItemType
  itemType: ItemType
  lessonName: string
  lessonDesc: string
  createdName: CreatedName
  moduleID: string
  teamRoot: number
  expirationDate: DateISO8601
  isAnswerKey: boolean
  exposureCalc: ExposureCalc
  hasChange?: boolean
  hasDelete?: boolean
  restrictOriginal: RestrictOriginal
  assetDate: DateISO8601
  viewCount: number
  hasViewOriginal: boolean
  name: string
  locID: number
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: DateISO8601
  primaryElementID: number
  modifiedByID: number
  modifiedDate: DateISO8601
  shareChangedDate: DateISO8601
  shareChangedByID: number
  assets: Asset[]
  activeStatus: ActiveStatus
}

export type AssetType = 'ocURL' | 'ocImage' | 'ocPDF'

export interface Asset {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: AssetType
  orientation: Orientation
  modifiedDate: DateISO8601
  modifiedByID: number
  createdDate: DateISO8601
  createdByID: number
  createdByName: CreatedName
  sequence: number
  softwareRequirements: string
  originalMD5: OriginalMD5
  domainID: number
  encodings?: Encoding[]
  courseItemID: number
}

export type CreatedName = string

export interface Encoding {
  encodingType: EncodingType
  mimeType: MIMEType
  modifiedDate: DateISO8601
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: ActiveStatus
  pathURL: string
}

export type EncodingType = 'ocDEFAULT' | 'ocTHUMBNAIL'

export type Orientation = 'ocVOID'

export type OriginalMD5 =
  | ''
  | 'PtwJ7ePLAzkckG/PzkCpBg=='
  | 'WI9d1fqUOBAx5YftH+wlug=='

export type ExposureCalc = 'ocSHARED' | 'ocROOT'

export type ItemType = 'ocURL' | 'ocDOCUMENT'

export type LessonOcType = 'ocLESSON'

export type RestrictOriginal = 'ocDISABLED'

export interface Member {
  member: MemberMember
  taskMemberID: number
  memberID: number
  taskID: number
  isRsvpExpected: boolean
  icalPartRole: string
  icalPartStatus: string
  createdByID: number
  createdDateUTC: DateISO8601
  modifiedByID: number
  modifiedDateUTC: DateISO8601
  delgatedFromID: number
  emailPreference: AttemptLastStatus
}

export type TaskOcType = 'ocTASK'

export interface MemberMember {
  mentors: unknown[]
  memberID: number
  memberName: string
  locID: number
  ocType: string
  domainID: number
  primaryElementID: number
  activeStatus: ActiveStatus
  photoAsset?: PhotoAsset
}

export type ActiveStatus = 'ocENABLED'

export interface PhotoAsset {
  ocType: string
  assetID: number
  assetType: string
  courseItemID: number
  assetPath: string
  sizeBytes: number
  mimeType: MIMEType
  thumbnailPath: string
  thumbnailMimeType: MIMEType
  height: number
  width: number
  length: number
  isFixedThumbnailPath: number
  isFixedAssetPath: number
  sequence: number
  softwareRequirements: string
  locID: number
  domainID: number
}

export type MIMEType = 'text/html' | '' | 'image/jpeg'
