import { TytoBaseResponse } from '@tyto/manifest'

interface Status {
  devPlanStepID: number
  prereqID: number
  curriculumID: number
  participantCount: number
  completeStatus: string
  hoursElapsedFromAdd: number
  hoursElapsedFromStart: number
  avgScore: number
}

interface Step {
  devPlanStepID: number
  prereqID: number
  name: string
  curriculumType: string
  curriculumSubType: string
  curriculumID: number
  seq: number
  participantsStatus: Status[]
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  curriculumID?: number
  memberIDs?: string
  beginDateEnrolled?: string
  teamPath?: string
  outsideType?: string
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  results: {
    totalParticipants: number
    curriculumID: number
    curriculumName: string
    curriculumType: string
    steps: Step[]
  }
}

export interface PostParameters {
  memberIDsArray?: number[]
  curriculumID?: number
  memberIDs?: string
  beginDateEnrolled?: string
  teamPath?: string
  outsideType?: string
}

export interface PostResponse extends TytoBaseResponse {
  results: {
    totalParticipants: number
    curriculumID: number
    curriculumName: string
    curriculumType: string
    steps: Step[]
  }
}
