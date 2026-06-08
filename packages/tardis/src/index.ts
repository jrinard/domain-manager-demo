/**
 * I'll save you the time I lost trying to find and figure such out:
 * Exhaustive List of Tokens here --> https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens
 */
export const WEEK_DAYS: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export * from './TytoDates'
export { getUTCNoonDate } from './getUTCNoonDate'
export * from './times'

export { getMonthAndDateText } from './getMonthAndDateText'
export { getTimeRangeText } from './getTimeRangeText'
export { getFormattedDateString } from './getFormattedDateString'

export {
  createMonthGridData,
  WeekdayNumber,
} from './months/createMonthGridData'

export { DateTime, Settings } from 'luxon'
export type { DurationLikeObject } from 'luxon'
