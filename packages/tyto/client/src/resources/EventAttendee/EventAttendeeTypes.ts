import { TytoBaseResponse } from '@tyto/manifest'

export interface PutParameters {
  attendanceType: 'ocHOST' | 'ocGENERAL'
  eventID: number
  memberID: number
  eventAttendeeID: number
}
export type PutResponse = TytoBaseResponse & {
  recordsAffected: number
}

export interface PostParameters {
  attendanceType: 'ocHOST' | 'ocGENERAL'
  eventID: number
  memberID: number
  isCascade?: boolean
}
export type PostResponse = TytoBaseResponse & {
  recordsAffected: number
  eventAttendeeID: number
  countAdded: number
}

export interface DeleteParameters {
  eventID: number
  memberID: number
  eventAttendeeID: number
}
export type DeleteResponse = TytoBaseResponse & {
  recordsAffected: number
}
