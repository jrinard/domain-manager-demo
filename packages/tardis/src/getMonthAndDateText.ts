import { DateTime } from 'luxon'



export function getMonthAndDateText(date: Date | string) {
  const _date = new Date(date)

  if (isNaN(_date.getTime())) {
    return ''
  }

  return DateTime.fromJSDate(_date).toFormat('MMMM d')
}
