import { TytoBaseResponse, DateISO8601 } from '@tyto/manifest'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  curriculumID: number
  memberID: number
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  enrollmentHistoryID: number
  memberID: number
  curriculumID: number
  activeStatus: string
  completeStatus: string
  completedDate: DateISO8601
  passStatus: string
  score: number
  cummAttempts: number
  cummTime: DateISO8601
  sessionTime: DateISO8601
  lastDate: DateISO8601
  entryMode: string
  launchBehavior: string
  isEnrolled: boolean
  enrolledDate: DateISO8601
  isRegistered: boolean
  registeredDate: DateISO8601
  isLaunchable: boolean
  isPaid: boolean
  paidDate: DateISO8601
  mentorID: number
  comment: string
  verifiedUserID: number
  prerequisiteID: number
  enrollmentID: number
  creditID: number
  enrollmentHistoryDate: DateISO8601
  location: string
  registeredBy: number
  recertDate: DateISO8601
  bookMark: string
  bookMark4096?: string
  startedDate?: DateISO8601
}
