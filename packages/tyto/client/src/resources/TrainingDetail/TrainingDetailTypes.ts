import { TytoBaseResponse } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  personID: number
  catalogID?: number
  beginDate?: string
  endDate?: string
  completeStatus?: string
}

/**
 * Use https://app.quicktype.io/
 */
interface TrainingDetail {
  memberID: number
  blockID: number
  blockName: string
  preReqID: number
  curriculumID: number
  cType: string
  cSubType: string
  stepName: string
  cntAttempts: number
  minutesVidPlayThrough: number
  passStatus: string
  completeStatus: string
  completedDate: string
  lastDate: string
}

export interface GetResponse extends TytoBaseResponse {
  trainingSummary: TrainingDetail[]
  daysActive: number
}
