import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

export interface GetParameters {
  createdByID?: number
}

export interface GetResponse extends TytoBaseResponse {
  curriculumCompleteJobs: JobItem[]
}

interface JobItem {
  actualEnrollmentCount: number
  completeAsOfDate: DateISO8601
  createdByID: number
  createdDate: DateISO8601
  curriculumCompleteJobID: number
  discardEnrollmentBeforeDate: DateISO8601
  estimatedEnrollmentCount: number
  execDate: DateISO8601
  execResult: number
  jobName: string
  notifyParticipants: boolean
}
