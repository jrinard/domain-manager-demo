import { TytoBaseResponse } from '@tyto/manifest'
import { Event, RecurringEvent } from './types/EventType'

export interface GetParameters {
  /** @example 2023-09-15T05%3A00%3A00.000Z */
  filterTimeUTC_min?: string
  /** @example 2023-10-01T05%3A00%3A00.000Z */
  filterTimeUTC_max?: string
  /**
   *
   */
  filterActiveStatus?: 'ocENABLED' | 'ocDISABLED'
  /**
   * @description Show me events above teams I have memberships to
   * @example false
   */
  above?: boolean
  /**
   * @description Show me events below teams I have memberships to
   * @example false
   */
  below?: boolean
  /**
   * @description Show me events I have direct membership to
   * @example true
   */
  direct?: boolean
}
export interface GetResponse extends TytoBaseResponse {
  events: Event[]
  recurringEvents: RecurringEvent[]
}
