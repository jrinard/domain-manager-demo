import { TytoBaseResponse } from '@tyto/manifest'
import {
  AddRecurrenceRuleResponses,
  Event,
  RecurrenceRule,
} from './types/EventResourceTypes'

export interface GetParameters {
  eventID: number
}
export interface GetResponse extends TytoBaseResponse {
  event: Event
}

export interface PostParameters
  extends Pick<
    Event,
    | 'defaultReminderMinutes'
    | 'location'
    | 'eventDesc'
    | 'eventName'
    | 'eventType'
    | 'invitationType'
    | 'startTime'
    | 'endTime'
    | 'timeZoneIDStart'
    | 'timeZoneIDEnd'
  > {
  prepareAction?: boolean
  prepareAgenda?: boolean
  recurrenceRules: RecurrenceRule[]
}

export interface PostResponse extends TytoBaseResponse {
  eventID: number
  recordsAffected: number
  addRecurrenceRuleResponses: AddRecurrenceRuleResponses[]
}

export interface PutParameters
  extends Pick<
    Event,
    | 'eventID'
    | 'defaultReminderMinutes'
    | 'location'
    | 'eventDesc'
    | 'eventName'
    | 'eventType'
    | 'invitationType'
    | 'startTime'
    | 'endTime'
    | 'timeZoneIDStart'
    | 'timeZoneIDEnd'
  > {
  prepareAction?: boolean
  prepareAgenda?: boolean
  recurrenceRules?: RecurrenceRule[]
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface DeleteParameters {
  eventID: number
}

export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
