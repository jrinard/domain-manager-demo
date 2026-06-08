import { TytoBaseResponse } from '@tyto/manifest'

interface TrainingSummaryItem {
  personID: number
  personName: string
  email: string
  securityRoleName: string
  teamRootName: string
  lastLogon: string
  lastSessionActivity: string
  outsideTerminateDate: string
  curriculumTitle: string
  curriculumID: number
  curriculumActivityDate: string
  minutesVidPlayThrough: number
  inclusiveCatalogID: number
  inclusiveCurriculumTitle: string
  inclusiveLastCurriculumID: number
  inclusiveLastCurriculumActivityDate: string
  inclusiveVideoDistinctCount: number
  inclusivePointsExamsAttempted: number
  inclusivePointsAwardedExamsAttempted: number
  inclusivecountLessonsCompleted: number
  inclusivecountDistinctLessonsCompleted: number
  inclusivecountExamsPassed: number
  inclusivecountExamsAttempted: number
  inclusivecountDistinctExamsPassed: number
  countExamsAttempted: number
  countExamsPassed: number
  inclusiveVideoCount: number
  vidPlayCountDistinct: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  beforeDate?: string
  afterDate?: string
  teamID?: number
  catalogID?: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  trainingSummary: TrainingSummaryItem[]
}
