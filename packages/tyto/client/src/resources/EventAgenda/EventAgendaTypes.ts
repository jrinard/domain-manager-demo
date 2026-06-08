import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */

export interface PostParameters {
  taskName: string
  memberID: number
  displayInToDos: boolean
  sendNotice: boolean
  dueDate: DateISO8601
  durationMinutes: number
  startDate: DateISO8601
  taskDesc: string
}

export interface PostResponse extends TytoBaseResponse {
  parentTaskID: number
  recordsAffected: number
  taskID: number
}
