import { Resource } from '../utils/helpers'
import { postCall, CallOpts } from '../utils/utils'
import { TytoBaseResponse } from '@tyto/manifest'

export interface TaskNoticePostParameters {
  taskID: number
  commentText?: string
  /** Comma-separated lesson/asset IDs to attach (optional). */
  aboutIDs?: string
  /** Comma-separated types matching aboutIDs, e.g. 'ocLESSON' (optional). */
  aboutTypes?: string
}

export interface TaskNoticePostResponse extends TytoBaseResponse {
  noticeID: number
  recordsAffected: number
}

export class TaskNotice extends Resource {
  override endpoint = '/Task/Notice'

  post(params: TaskNoticePostParameters, callOpts?: CallOpts) {
    return postCall<TaskNoticePostResponse>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts,
    )
  }
}
