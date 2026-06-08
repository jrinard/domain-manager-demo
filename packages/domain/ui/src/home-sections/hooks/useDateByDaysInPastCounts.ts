import { useMemo } from 'react'

export function useDateByDaysInPastCounts(daysCount: number) {
  return useMemo(() => {
    const date = new Date()
    const dateInPast = new Date(
      date.getTime() - 1000 * 60 * 60 * 24 * daysCount,
    )

    dateInPast.setHours(0, 0, 0, 0)

    const now = new Date()
    now.setMinutes(0, 0, 0)

    return {
      dateInPast,
      dateInPastString: dateInPast.toISOString(),
      bottomOfCurrentHourString: now.toISOString(),
    }
  }, [daysCount])
}
