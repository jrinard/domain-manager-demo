import { DateTime } from 'luxon'
import { isTytoNullDate } from './TytoDates'

export function getTimeRangeText({
  startDate,
  endDate,
  format = 'h:mm a',
}: {
  startDate: Date | string
  endDate: Date | string
  format?: string
}) {
  const _dateStart = new Date(startDate)
  const _dateEnd = new Date(endDate)

  if (isNaN(_dateStart.getTime())) {
    return ''
  }

  const startTimeDate = DateTime.fromJSDate(_dateStart)
  const endTimeDate = DateTime.fromJSDate(_dateEnd)

  let startTime = startTimeDate.toFormat(format)
  let endTime = endTimeDate.toFormat(format)

  if (datesAreDifferentDay(_dateStart, _dateEnd)) {
    startTime = startTimeDate.toFormat('MMM d')
    endTime = endTimeDate.toFormat('MMM d')
  }
  if (!endTimeDate.isValid || isTytoNullDate(endDate)) {
    endTime = '??'
  }

  if (!startTimeDate.isValid || isTytoNullDate(startDate)) {
    startTime = '??'
  }

  return `${startTime} - ${endTime}`
}

function datesAreDifferentDay(date1: Date, date2: Date) {
  return (
    date1.getDate() !== date2.getDate() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getFullYear() !== date2.getFullYear()
  )
}
