import { TytoBaseResponse, RsvpStatus } from '@tyto/manifest'

export interface PutParameters {
  eventID: number
  memberID: number
  rsvpStatus: RsvpStatus
  emailPreference?: 'ocINSTANT' | 'ocVACANT' | 'ocDISABLED'
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
  eventAttendeeID: number
}
