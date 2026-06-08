import { DateTime, Interval } from 'luxon'

export const createTimeOfDayIntervals = (
  intervalMinutes: number,
  startTime = '00:00',
  endTime = '24:00'
): Map<Interval, string> => {
  const dtStart = DateTime.fromFormat(startTime, 'HH:mm')
  const dtEnd = DateTime.fromFormat(endTime, 'HH:mm')

  const map = new Map<Interval, string>()
  Interval.fromDateTimes(dtStart, dtEnd)
    .splitBy({ minutes: intervalMinutes })
    .filter((item: Interval) => item.start?.isValid === true)
    .forEach((item: Interval) => {
      map.set(item, item.start!.toFormat('hh:mm a'))
    })
  return map
}
