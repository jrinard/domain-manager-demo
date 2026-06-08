import { AttendanceStatus, RsvpStatus } from '@tyto/manifest'
import { RecurrenceRule as EventRecurrenceRule } from '../../Event/types/EventResourceTypes'

export interface Event {
  eventID: number
  eventName: string
  eventDesc: string
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
  timeZoneStart: TimeZone
  timeZoneIDEnd: number
  timeZoneEnd: TimeZone
  groupElementID: number
  library: never[]
  iCalUID: string
  /**
   * Version of the calendar event
   */
  iCalSequence: number
  iCalRecurIndexDate?: DateISO8601
  iCalHost?: string
  attendees: PersonalAttendance[]
  personalAttendance?: PersonalAttendance | undefined
  minutesLessonID: number
  curriculumID?: number
  outsideRegMsg?: string
  outsideRegUrl?: string
  hasNoticeMinutes: boolean
  hasAgendaSubTasks: boolean
  hasActionSubTasks: boolean
  seriesMasterEvent?: SeriesMasterEvent
  organizer?: Organizer
}

export interface RecurringEvent extends Event {
  recurrenceRules: RecurrenceRule[]
  recurrenceSeries: Recurrence[]
}

export interface PersonalAttendance {
  eventAttendeeID: number
  eventID: number
  memberID: number
  isCascade: boolean
  attendanceType: AttendanceType
  rsvpStatus: RsvpStatus
  rsvpStatusDateUTC: DateISO8601
  rsvpStatusByID: number
  attendanceStatus: AttendanceStatus
  attendanceStatusByID: number
  attendanceStatusDateUTC: DateISO8601
  emailPreference: EmailPreference
  modifiedByID: number
  modifiedDateUTC: DateISO8601
  createdByID: number
  createdDateUTC: DateISO8601
  lastReminderDateUTC: DateISO8601
  outsideRegistrationID: string
  paidDateUTC: DateISO8601
  reminderMinutes: number
  member: Member
}

export type AttendanceType = 'ocGENERAL' | 'ocHOST'

export type EmailPreference = 'ocINSTANT' | 'ocVACANT'

/**
 * Can be either user ("John Bailey") or Team ("Cardone Ventures Team")
 */
export interface Member {
  name: string
  ocType: Type
  elementName: string
  elementType: Type
}

export type Type = 'ocPERSON' | 'ocTEAM'

export interface Organizer {
  commonName: string
  sentBy: string
  value: string
}

export type RecurrenceRule = EventRecurrenceRule

export interface Recurrence {
  startDateAndOffset: DateISO8601
  startocTimeZoneID: number
  startZoneName: NameObserved
  endDateAndOffset: DateISO8601
  endocTimeZoneID: number
  endZoneName: NameObserved
  /**
   * If present then it exists already in the top-level `events` property
   */
  eventID?: number
  iCalRecurIndexDate: DateISO8601
}

export type NameObserved = 'HADT' | 'MDT' | 'PDT' | 'PST'

export interface SeriesMasterEvent {
  recurrenceRules: never[]
  eventID: number
}

export interface TimeZone {
  nameGeneral: NameGeneral
  iCalTZID: ICalTZID
  nameObserved: NameObserved
  observanceType: ObservanceType
  modifiedDateUTC: DateISO8601
  iCalTZURL: string
  startDate: DateISO8601
  offSetToMinutes: number
  offSetFromMinutes: number
  iCalRRule: ICalRRule
}

export type ICalRRule =
  | 'FREQ=YEARLY;WKST=MO;INTERVAL=1;BYMONTH=11;BYDAY=1SU'
  | 'FREQ=YEARLY;WKST=MO;INTERVAL=1;BYMONTH=3;BYDAY=2SU'

export type ICalTZID = 'America/Adak' | 'America/Denver' | 'America/Los_Angeles'

export type NameGeneral = 'US-AlaskaAleutian' | 'US-Mountain' | 'US-Pacific'

export type ObservanceType = 'ocDAYLIGHT' | 'ocSTANDARD'

/**
 * @example 2023-09-13T21:40:04.08+00:00
 */
type DateISO8601 = string
