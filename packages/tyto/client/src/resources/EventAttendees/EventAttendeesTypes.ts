import { DateISO8601, TytoBaseResponse } from '@tyto/manifest'

export interface EventAttendee {
  eventAttendeeID: number
  eventID: number
  instanceEventID?: number
  memberID: number
  isCascade: boolean
  attendanceType: string
  rsvpStatus: string
  rsvpStatusDateUTC: DateISO8601
  rsvpStatusByID: number
  attendanceStatus: string
  attendanceStatusByID: number
  attendanceStatusDateUTC: DateISO8601
  emailPreference: string
  modifiedByID: number
  modifiedDateUTC: DateISO8601
  createdByID: number
  createdDateUTC: DateISO8601
  lastReminderDateUTC: DateISO8601
  outsideRegistrationID: string
  paidDateUTC: DateISO8601
  reminderMinutes: number
  seriesMasterEventAttendeeID: number
  seriesMasterEventID: number
  member: Member
  attendanceStatusBy?: By
  createdBy: By
}

export interface By {
  name?: string
  locID?: number
  ocType: string
  elementID?: number
  elementName?: string
  elementDesc?: string
  elementType?: string
  elementSubType?: string
  domainID?: number
  outsideID?: string
  createdByID?: number
  createdDate?: DateISO8601
  primaryElementID?: number
  modifiedByID?: number
  modifiedDate?: DateISO8601
  activeStatus?: string
}

export interface Member {
  familyName?: string
  familiarName?: string
  businessCardPreferences?: string
  profileImageID?: number
  name: string
  locID: number
  ocType: string
  elementID?: number
  elementName?: string
  elementDesc?: string
  elementType?: string
  elementSubType?: string
  domainID: number
  outsideID: string
  createdByID: number
  createdDate: DateISO8601
  primaryElementID: number
  modifiedByID: number
  modifiedDate: DateISO8601
  subDomainParentNamePath?: string
  activeStatus: string
  teamDesc?: string
  teamType?: string
}

export interface GetParameters {
  eventID: number
}

export interface GetResponse extends TytoBaseResponse {
  /**
   * Will not be present if failed
   */
  eventAttendees: EventAttendee[]
}
