import { useMemo } from 'react'
import { EventWithRegistration } from '../types/EventTypes'
import { isWithinInterval, subMinutes } from 'date-fns'

export function useIsEventWithin5Minutes(event?: EventWithRegistration) {
  return useMemo(() => {
    if (!event || !event.start || !event.end) {
      return false
    }
    const now = new Date()
    const start = new Date(event.start)
    const end = new Date(event.end)
    const fifteenMinutesBeforeStart = subMinutes(start, 5)

    return isWithinInterval(now, {
      start: fifteenMinutesBeforeStart,
      end: end,
    })
  }, [event])
}
