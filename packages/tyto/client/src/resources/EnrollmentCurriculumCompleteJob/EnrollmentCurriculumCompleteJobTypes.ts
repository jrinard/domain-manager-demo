import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

export interface PostParameters {
  jobName?: string
  memberIDs: number[]
  enrollBlockIDs?: number[]
  completeCurriculumIDs?: number[]
  notifyParticipants?: boolean
  discardEnrollmentBeforeDate?: DateISO8601
  completeAsOfDate?: string
}

export interface PostResponse extends TytoBaseResponse {
  curriculumCompleteJobID: number
}
