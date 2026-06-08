import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  forUserID: number
  dateBegin?: DateISO8601
  dateEnd?: DateISO8601
  isShallowKeepAlive?: boolean
}

export interface GetResponse extends TytoBaseResponse {
  Transcript: Transcript[]
}

export interface Transcript {
  userID: number
  familyName: string
  givenName: string
  isEnrolled: boolean
  isRegistered: boolean
  completeStatus: string
  curriculumName: string
  curriculumType: string
  passStatus: string
  score: number
  isCredit: number
  creditUnitDesc: string
  creditUnits: number
  approvalCode: string
  lastDate: DateISO8601
  registeredDate: DateISO8601
  curriculumID: number
  completedDate: DateISO8601
  elementName: string
  blockExpirationDate: DateISO8601
  activeStatus: string
  blockActiveStatus: string
  memberName: string
}
