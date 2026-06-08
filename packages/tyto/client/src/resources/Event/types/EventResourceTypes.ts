import { AttendanceStatus, RsvpStatus } from '@tyto/manifest'

/**
 * Does not have the `attendees` property.
 *  Please see EventAttendees for those details
 */
export interface Event {
  eventID: number
  eventName: string
  eventDesc: string
  /**
   * Property is not on "events"
   */
  elementType: 'ocEVENT'
  eventType: 'ocITEM'
  activeStatus: 'ocENABLED' | 'ocDISABLED'
  domainID: number
  outsideID: string
  /**
   * User ID (possibly Team ID)
   * @example 2077672
   */
  createdBy: number
  /**
   * @example '2023-09-13T21:40:04.08+00:00'
   */
  createdDate: DateISO8601
  /**
   * Security Context
   * @example 2077672
   */
  primaryElementID: number
  /**
   * User ID (possibly Team ID)
   * Who last modified
   * @example 2077672
   */
  modifiedBy: number
  /**
   * @example '2023-09-15T18:07:21.343+00:00'
   */
  modifiedDate: DateISO8601
  /**
   * @example '2023-09-15T14:30:00'
   */
  startTime: DateISO8601
  /**
   * @example '2023-09-15T15:00:00'
   */
  endTime: DateISO8601
  /**
   * Used in /event to generate event details
   * @example '2023-09-15T14:30:00-07:00'
   */
  startTimeAndOffset: DateISO8601
  /**
   * Used in /event to generate event details
   * @example '2023-09-15T15:00:00-07:00'
   */
  endTimeAndOffset: DateISO8601
  /**
   * @example false
   */
  isAllDay: boolean
  /**
   * Location can either be physical address, a room, a link, or anything the user provides
   * @example 'https://www.google.com/url?q=https://us06web.zoom.us/j/87199395162?pwd%3DeXRlUDQ2Ujd2ZCszTDVzRmgyQmdpUT09&sa=D&source=calendar&ust=1687294130724269&usg=AOvVaw1Y_YcMc9aI1hbXbZgXeIDN'
   */
  location: string
  /**
   * Possible this is never used
   * @example ''
   */
  streetAddress: string
  /**
   * @example 0
   */
  profileImageID: number
  invitationType: 'ocSELF'
  /**
   * If maxCapacity is 0 then it means unlimited
   * @example 0
   */
  maxCapacity: number
  rsvpDeadlineDateUTC: DateISO8601
  defaultReminderMinutes: number
  examTaskID: number
  addExamTaskInviteDelayOffsetFromEndTime: number
  startTimeUTC: DateISO8601
  endTimeUTC: DateISO8601
  agendaTaskID: number
  actionTaskID: number
  timeZoneIDStart: number
  timeZoneStart: LocalTimeZoneEnd
  timeZoneIDEnd: number
  timeZoneEnd: LocalTimeZoneEnd

  /**
   * Not on /events
   */
  localTimeZoneIDStart: number
  /**
   * Not on /events
   */
  localTimeZoneStart: LocalTimeZoneEnd
  /**
   * Not on /events
   */
  localTimeZoneIDEnd: number
  /**
   * Not on /events
   */
  localTimeZoneEnd: LocalTimeZoneEnd
  /**
   * Not on /events
   */
  addAccess: boolean
  /**
   * Not on /events
   */
  viewAccess: boolean
  /**
   * Not on /events
   */
  changeAccess: boolean
  /**
   * Not on /events
   */
  deleteAccess: boolean
  groupElementID: number
  /**
   * Not on /events
   */
  addPersonInvite: boolean
  /**
   * Not on /events
   */
  addTeamInvite: boolean
  library: never[]
  iCalUID: string
  /**
   * Version of the calendar event
   */
  iCalSequence: number
  iCalRecurIndexDate?: DateISO8601
  iCalHost?: string
  personalAttendance?: PersonalAttendance
  seriesMasterEvent: SeriesMasterEvent
  hasSubtabs: boolean
  minutesLessonID: number
  curriculumID: number
  outsideRegMsg: string
  outsideRegUrl: string
}

export interface LocalTimeZoneEnd {
  nameGeneral: string
  iCalTZID: string
  nameObserved: string
  observanceType: string
  modifiedDateUTC: DateISO8601
  iCalTZURL: string
  startDate: DateISO8601
  offSetToMinutes: number
  offSetFromMinutes: number
  iCalRRule: string
}

export interface PersonalAttendance {
  eventAttendeeID: number
  eventID: number
  memberID: number
  isCascade: boolean
  attendanceType: string
  rsvpStatus: RsvpStatus
  rsvpStatusDateUTC: DateISO8601
  rsvpStatusByID: number
  attendanceStatus: AttendanceStatus
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
}

export interface SeriesMasterEvent {
  recurrenceRules: RecurrenceRule[]
  eventID: number
  startTime: DateISO8601
  startTimeAndOffset: DateISO8601
  timeZoneStart: TimeZoneStart
}

export interface RecurrenceRule {
  /**
   * @example 'FREQ=WEEKLY;UNTIL=20240702T135900Z;BYDAY=TH'
   */
  iCalRule: string
  /**
   * @example 1
   */
  interval: number
  isFriday?: boolean
  isMonday?: boolean
  isSaturday?: boolean
  isSunday?: boolean
  isThursday?: boolean
  isTuesday?: boolean
  isWednesday?: boolean
  period: 'ocDAILY' | 'ocWEEKLY' | 'ocMONTHLY' | 'ocYEARLY'
  untilCount?: number
  untilDate?: DateISO8601
  untilDateUTC?: DateISO8601
  /**
   * @example 10728
   */
  recurrenceICALID: number
  ordinal: 'ocFIRST' | 'ocSECOND' | 'ocTHIRD' | 'ocFOURTH' | 'ocLAST'
}

export interface TimeZoneStart {
  offSetToMinutes: number
}

/**
 * @example 2023-09-13T21:40:04.08+00:00
 */
type DateISO8601 = string

export type AddRecurrenceRuleResponses = {
  icalRecurrenceRule: string
  icalRecurrenceID: number
  sts: number
  msg: string
}
