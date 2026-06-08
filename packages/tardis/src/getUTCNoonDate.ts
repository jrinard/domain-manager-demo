import { DateTime } from 'luxon'
import { TYTO_NULL_DATE } from './TytoDates'

const DEFAULT_TIME_OVERRIDES = {
  hour: 12,
  minute: 0,
  second: 0,
  millisecond: 0,
}

interface Options {
  timeOverrides?: {
    hour?: number
    minute?: number
    second?: number
    millisecond?: number
  }
  forceDayBeforeUTCAdjustment?: boolean
}

/**
 * Returns a date or a date string into a date of the same day but at noon UTC
 */
export function getUTCNoonDate(date: Date | string, opts?: Options): string {
  const {
    timeOverrides = DEFAULT_TIME_OVERRIDES,
    forceDayBeforeUTCAdjustment = false,
  } = opts ?? {}

  let asJSDate = DateTime.fromJSDate(
    typeof date === 'string' ? new Date(date) : (date as Date),
  )
  asJSDate = asJSDate.setZone('utc', {
    keepLocalTime: !!forceDayBeforeUTCAdjustment,
  })

  asJSDate = asJSDate.set({
    hour: timeOverrides.hour ?? DEFAULT_TIME_OVERRIDES.hour,
    minute: timeOverrides.minute ?? DEFAULT_TIME_OVERRIDES.minute,
    second: timeOverrides.second ?? DEFAULT_TIME_OVERRIDES.second,
    millisecond:
      timeOverrides.millisecond ?? DEFAULT_TIME_OVERRIDES.millisecond,
  })
  // .toISO() || TYTO_NULL_DATE

  return asJSDate.toISO() || TYTO_NULL_DATE
}
