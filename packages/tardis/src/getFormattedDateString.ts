import { DateTime } from 'luxon'

/**
 * I'll save you the time I lost trying to find and figure such out:
 * Exhaustive List of Tokens here --> https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens
 */

export function getFormattedDateString(
  date: string | Date,
  fmt = 'ccc, LLL d, y'
): string {
  const _date = new Date(date)

  if (isNaN(_date.getTime())) {
    return ''
  }

  return DateTime.fromJSDate(_date).toFormat(fmt)
}
