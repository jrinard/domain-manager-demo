import { getUTCNoonDate } from '@spacedock/tardis'
import format from 'date-fns/format'

export function onChangeDate(
  newValue: string,
  originalValue: string,
): {
  date?: Date
  dateString: string
} {
  //check if input is being typed in correct format
  if (
    /^(\d{0,2})$/.test(newValue) ||
    /^(\d{1,2})\/$/.test(newValue) ||
    /^(\d{1,2})\/(\d{1,2})$/.test(newValue) ||
    /^(\d{1,2})\/(\d{1,2})\/$/.test(newValue) ||
    /^(\d{1,2})\/(\d{1,2})\/(\d{1,4})$/.test(newValue)
  ) {
    const dateRE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    //check if input is in correct date format
    if (dateRE.test(newValue)) {
      const dates = dateRE.exec(newValue)
      if (dates?.length === 4) {
        const [, month, date, year] = dates.map(Number)
        const newDate = new Date(year, month - 1, date)
        //check if supplied date constructs into the same date
        if (
          !isNaN(+newDate) &&
          newDate.getFullYear() === year &&
          newDate.getMonth() === month - 1 &&
          newDate.getDate() === date
        ) {
          const utcDate = new Date(
            getUTCNoonDate(newDate, { forceDayBeforeUTCAdjustment: true }),
          )
          return {
            date: utcDate,
            dateString: format(utcDate, 'MM/dd/yyyy'),
          }
        } else {
          throw new Error(
            'Invalid Date: Supplied date does not match the constructed date',
          )
        }
      }
    }
    return { dateString: newValue }
  } else {
    return { dateString: originalValue }
  }
}
