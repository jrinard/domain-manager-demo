/* @flow */
import { isDate } from 'lodash'

// Null date constants
export const TYTO_NULL_DATE = '1900-01-01T00:00:00.000Z'
export const TYTO_NULL_DATE_NOT_ISO = '1900-01-01T00:00:00+00:00'
export const TYTO_NULL_DATE_ENCODED = '1900-01-01T00%3A00%3A00-11%3A30'
export const TYTO_FUTURE_NULL_DATE = '2500-01-01T00:00:00.000Z'

// Exporting constants for reuse
export const tytoNullDate = TYTO_NULL_DATE
export const tytoFutureNullDate = TYTO_FUTURE_NULL_DATE

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

/**
 * Check if a given date is considered a Tyto null date.
 * @param {Date | string} date - The date to check.
 * @returns {boolean} - True if the date is a null date, otherwise false.
 */
export function isTytoNullDate(date: Date | string): boolean {
  date = isDate(date) ? date : new Date(date)
  if (Number.isNaN(+date)) {
    return false
  }
  const nullDate = new Date(TYTO_NULL_DATE)
  const diff = Math.abs(date.getTime() - nullDate.getTime())
  return diff < ONE_YEAR_MS
}

/**
 * Check if a given date is considered a Tyto future null date.
 * @param {Date | string} date - The date to check.
 * @returns {boolean} - True if the date is a future null date, otherwise false.
 */
export function isTytoFutureNullDate(date: Date | string): boolean {
  date = isDate(date) ? date : new Date(date)
  if (Number.isNaN(+date)) {
    return false
  }
  return date.getFullYear() >= 2499
}

/**
 * Check if a given date is expired.
 * - Returns false if the date is null or invalid.
 * @param {Date | string} date - The date to check.
 * @returns {boolean} - True if the date is expired, otherwise false.
 */
export function isExpiredDate(date: Date | string): boolean {
  date = isDate(date) ? date : new Date(date)
  if (Number.isNaN(+date)) {
    return false
  } else if (isTytoNullDate(date)) {
    return false
  }
  return +date < Date.now()
}

/**
 * Convert a date to ISO format with its local timezone offset.
 * @param {Date | string} date - The date to convert.
 * @returns {string} - The ISO string with timezone offset.
 */
export function toISOStringWithOffset(date: Date | string): string {
  const d = new Date(date)
  if (!Number.isNaN(+d)) {
    const tzo = -d.getTimezoneOffset()
    const dif = tzo >= 0 ? '+' : '-'
    const pad = (num: number) =>
      (Math.abs(Math.floor(num)) < 10 ? '0' : '') + Math.abs(Math.floor(num))
    return (
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
      `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
      `${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`
    )
  }
  return ''
}

function dateStringIsISO(date: string): boolean {
  // * Technically, there could be less characters and still be ISO, but this is the most common format within Tyto Responses.
  return /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{2,4})?(Z)?)$/g.test(date)
}

function hasReachedTime(
  date: string | Date,
  opts?: { accuracy: 'day' | 'hour' },
) {
  if (!isDate(date)) {
    if (dateStringIsISO(date)) {
      date = new Date(!/Z$/.test(date) ? `${date}Z` : date)
    } else {
      date = new Date(date)
    }
  }

  if (Number.isNaN(+date)) {
    return false
  } else if (isTytoNullDate(date)) {
    return false
  }

  if (opts?.accuracy) {
    const clearHours = opts.accuracy === 'day'
    const clearMinutes = clearHours || opts.accuracy === 'hour'

    date.setHours(
      clearHours ? 0 : date.getHours(),
      clearMinutes ? 0 : date.getMinutes(),
      opts.accuracy === 'day' ? 0 : date.getSeconds(),
      opts.accuracy === 'day' ? 0 : date.getMilliseconds(),
    )
  }

  return +date < Date.now()
}

export function isExpired(date: string | Date) {
  return hasReachedTime(date)
}

export function isToday(date: string | Date) {
  return hasReachedTime(date, { accuracy: 'day' })
}

export const isDeactivated = isToday
