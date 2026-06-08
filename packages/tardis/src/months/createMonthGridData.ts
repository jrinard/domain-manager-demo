import { DateTime, Interval } from 'luxon'
export const WeekdayNumber = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
}
type MonthGridData = DateTime[][]
export const createMonthGridData = (monthOf: DateTime): MonthGridData => {
  const firstWeekday = monthOf.startOf('month').weekday
  const lastWeekday = monthOf.endOf('month').weekday
  const howManyDaysBack =
    WeekdayNumber.Sunday === firstWeekday ? 0 : firstWeekday
  const howManyDaysForward =
    WeekdayNumber.Saturday === lastWeekday ? 0 : 6 - lastWeekday

  const interval = Interval.fromDateTimes(
    DateTime.fromJSDate(
      monthOf.startOf('month').minus({ days: howManyDaysBack }).toJSDate()
    ),
    DateTime.fromJSDate(
      monthOf.endOf('month').plus({ days: howManyDaysForward }).toJSDate()
    )
  )
  const days = interval.splitBy({ day: 1 }).map((item: Interval) => item.start)
  const result: MonthGridData = [
    days.slice(0, 8) as DateTime[],
    days.slice(8, 15) as DateTime[],
    days.slice(15, 22) as DateTime[],
    days.slice(22, 29) as DateTime[],
    days.slice(29, 37) as DateTime[],
    days.slice(37, 45) as DateTime[],
  ]
  return result
}
