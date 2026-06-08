import { format, formatDistance } from 'date-fns'

export const TYTO_NULL_DATE_TEXT = 'None'

const STANDARD_DATE_FORMAT = 'M/dd/yyyy'
const TWELVE_HOURS_IN_MS = 43_200_000
const STANDARD_DATE_TIME_FORMAT = 'M/dd/yyyy hh:mm a'

export function getSafeDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  // * Check safeDate is not invalid Date
  if (Number.isNaN(date.getTime())) {
    throw Error('Unsafe Date')
  }

  return date
}

export const formatDate = (
  suppliedDate: Date | string,
  options?: { relativeTimeLanguageBehavior?: string; showTime?: boolean },
) => {
  if (!suppliedDate) return TYTO_NULL_DATE_TEXT

  const safeSuppliedDate = getSafeDate(suppliedDate)
  if (safeSuppliedDate.getFullYear() < 1901) {
    return TYTO_NULL_DATE_TEXT
  }

  if (options?.relativeTimeLanguageBehavior === 'only-today') {
    const today = new Date()
    if (
      safeSuppliedDate.getFullYear() === today.getFullYear() &&
      safeSuppliedDate.getMonth() === today.getMonth() &&
      safeSuppliedDate.getDate() === today.getDate()
    ) {
      return 'Today'
    }
  }

  if (options?.relativeTimeLanguageBehavior === 'all-dates') {
    return formatDistance(safeSuppliedDate, new Date()) + ' ago'
  }

  return format(
    safeSuppliedDate,
    options?.showTime ? STANDARD_DATE_TIME_FORMAT : STANDARD_DATE_FORMAT,
  )
}

export function handleNullOverrideText(displayDate: string, fallback?: string) {
  return displayDate === TYTO_NULL_DATE_TEXT && fallback
    ? fallback
    : displayDate
}
