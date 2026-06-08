import { DateISO8601 } from '@tyto/manifest'

export interface Member {
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
  ocType: 'ocTASK'
  taskID: number
  taskName: string
  taskDesc: string

  /**
   * ocCONTAINER is a ____ and generally used for __
   */
  taskType: 'ocCONTAINER' | 'ocMEETINGAGENDA'
  memberID: number
  mentorID: number
  recurrenceID: number
  completionNote: string
  taskStatus: string
  taskStatusDate: DateISO8601
  completedByID: number
  dueDate: DateISO8601
  createdByID: number
  createdDate: DateISO8601
  modifiedByID: number
  modifiedDate: DateISO8601
  aboutID: number
  aboutType: string
  daysUntilDueFromSiblingCompletion: number
  devplanStepID: number
  areChildrenSequential: boolean
  isCompletionOptional: boolean
  percentComplete: number
  setStatus: number
  attemptCountMax: number
  attemptCount: number
  attemptLastStatus: string
  rootTaskID: number
  startDate: DateISO8601
  durationMinutes: number
  initialStartDate: DateISO8601
  about: About
  completedAsOfDate: DateISO8601
  taskStatusByID: number
  isConfidential: boolean
  members: Member[]
  verifierTasks: any[]
  permission: Permission
}

export interface About {
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
  createdDate: DateISO8601
  primaryElementID: number
  modifiedByID: number
  modifiedDate: DateISO8601
  libraryItemCount: number
  assets: any[]
  activeStatus: string
}

export interface Permission {
  hasView: boolean
  hasConfidentialView: boolean
  hasChangeStatus: boolean
  hasChangeStructure: boolean
  hasChangeExpectation: boolean
  hasChangeDelegate: boolean
}
