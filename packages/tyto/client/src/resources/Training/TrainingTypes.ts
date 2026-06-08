import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  memberID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  training: EnrolledBlock[]
  subBlocks: EnrolledSubBlock[]
}

type CompletionStatus =
  | 'ocINCOMPLETE'
  | 'ocNOTATTEMPTED'
  | 'ocINPROGRESS'
  | 'ocCOMPLETE'

export interface EnrolledBlock {
  enrollmentID: number
  registeredDate: DateISO8601
  registeredByID: number
  startedDate: DateISO8601
  dueDate: DateISO8601
  completeStatus: CompletionStatus
  statusDate: DateISO8601
  modifiedDate: DateISO8601
  recertDate: DateISO8601
  curriculumID: number
  curriculumType: string
  curriculumSubType: string
  curriculumName: string
  expirationDate: DateISO8601
  courseIdentifier: string
  onDueDateAction: string
  subTaskCompleteCount: number
  subTaskCount: number
  completePercent: number
  durationEstimate: string
  expectationDesc: string
  audienceDesc: string
  difficultyDesc: string
  authorID: number
  curriculumDescription: string
  subTaskRequiredCount: number
  subTaskRequiredCompleteCount: number
  requiredCompletePercent: number
  taskID?: number
  mainTitle?: string
  internalTitle?: string
  profileImage: ProfileImage

  // ! THESE ARE FAKE, CURATED ON THE FRONT END
  recursiveRequiredCompleteCount?: number
  recursiveRequiredCount?: number
  recursiveRequiredCompletePercent?: number
  coursesBelowCount: number
  completedCoursesBelowCount: number
}

export interface ProfileImage {
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
  encodings: Array<any>
  courseItemID: number
}

export interface EnrolledSubBlock {
  taskID: number
  enrollmentID: number
  registeredDate: string
  registeredByID: number
  startedDate: string
  dueDate: string
  completeStatus: CompletionStatus
  statusDate: string
  modifiedDate: string
  recertDate: string
  curriculumID: number
  curriculumType: string
  curriculumSubType: string
  curriculumName: string
  expirationDate: string
  courseIdentifier: string
  onDueDateAction: string
  profileImage: Asset
  profileImageFeatured: Asset
  subTaskCompleteCount: number
  subTaskCount: number
  completePercent: number
  durationEstimate: string
  expectationDesc: string
  audienceDesc: string
  difficultyDesc: string
  authorID: number
  curriculumDescription: string
  parentTasks: { taskID: number; rootTaskID: number }[]
  parentBlocks: ParentBlock[]
  subTaskRequiredCount: number
  subTaskRequiredCompleteCount: number
  requiredCompletePercent: number
  internalTitle: string

  // ! THESE ARE FAKE, CURATED ON THE FRONT END
  recursiveRequiredCompleteCount?: number
  recursiveRequiredCount?: number
  recursiveRequiredCompletePercent?: number
  coursesBelowCount: number
  completedCoursesBelowCount: number
}

interface ParentBlock {
  enrollmentID: number
  blockID: number
  // * This is computed on the Front End - kept for backward compatibility
  parentIDsPath?: number[]
  // * All possible paths to this parent block (for courses with multiple parent routes)
  allParentPaths?: number[][]
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
}

interface Encoding {
  encodingType: string
  mimeType: string
  modifiedDate: string
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: string
  pathURL: string
}
