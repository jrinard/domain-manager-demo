import { TytoData } from '@spacedock/manifest'
import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'

/** `taskType` values accepted by `Tasks.post`. */
export type PostTaskType =
  | 'ocTASK'
  | 'ocGROUP'
  | 'ocCONTAINER'
  | 'ocMEETINGAGENDA'

/**
 * Parameters for Tasks.post — supports both general project tasks and the
 * legacy meeting-agenda creation path.
 *
 * For project tasks: provide taskName, taskType ('ocTASK'|'ocGROUP'|'ocCONTAINER'),
 * and parentTaskID to place the task in the hierarchy.
 *
 * For meeting-agenda items: provide aboutID, aboutType: 'ocEVENT', and
 * taskType: 'ocMEETINGAGENDA'.
 */
export interface PostParameters {
  taskName?: string
  taskDesc?: string
  taskType?: PostTaskType
  parentTaskID?: number
  /** Assignee member ID for project tasks; project team member ID for meeting agendas. */
  memberID?: number
  dueDate?: DateISO8601
  startDate?: DateISO8601
  sendNotice?: boolean
  durationMinutes?: string
  /** Meeting-agenda only: the eventID this agenda item is attached to. */
  aboutID?: number
  /** Meeting-agenda only */
  aboutType?: 'ocEVENT'
  /** Meeting-agenda only */
  displayInToDos?: boolean
}

export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  taskID: number
}

export interface PutParameters {
  taskID: number
  displayInToDos?: boolean

  durationMinutes?: number

  taskName?: string
  taskDesc?: string

  /**
   * Who is assigned to the task
   */
  memberID?: number

  percentComplete?: number
  taskType?: string
  mentorID?: number
  recurrenceID?: number
  completionNote?: string
  taskStatus?: keyof typeof TytoData.TaskStatus
  taskStatusDate?: string
  completedByID?: number
  dueDate?: string
  isMentorOnlyCompletion?: boolean
  aboutID?: number
  aboutType?: string
  sendNotice?: boolean
  parentTaskID?: number
  devplanStepID?: number
  areChildrenSequential?: boolean
  isCompletionOptional?: boolean
  setStatus?: number
  attemptCountMax?: number
  attemptCount?: number
  attemptLastStatus?: string
  multiplicityRestrictions?: string
  startDate?: string
  daysUntilDueFromSiblingCompletion?: number
  completedAsOfDate?: string
  isConfidential?: boolean
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
  taskID: number
}

export interface DeleteParameters {
  taskID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  /**
   * If successful it should be -1
   */
  recordsAffected: number
}
