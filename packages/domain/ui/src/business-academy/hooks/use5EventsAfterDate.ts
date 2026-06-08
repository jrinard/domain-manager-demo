import { useMemo } from 'react'
import { EventWithRegistration } from '../types/EventTypes'
import { Dictionary } from 'lodash'

export function use5EventsAfterDate(
  eventsGroupedByDate: Dictionary<EventWithRegistration[]>,
  selectedDate: Date,
) {
  return useMemo(() => {
    const allEvents = Object.entries(eventsGroupedByDate)
      .flatMap(([date, events]) => events.map((event) => ({ date, event })))
      .filter(({ event }) => new Date(event.end) >= selectedDate)
      .slice(0, 5)

    return allEvents.reduce(
      (acc, { date, event }) => {
        acc[date] = acc[date] || []
        acc[date].push(event)
        return acc
      },
      {} as typeof eventsGroupedByDate,
    )
  }, [selectedDate, eventsGroupedByDate])
}
