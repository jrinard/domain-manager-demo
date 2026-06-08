import { useMemo } from 'react'
import { EventWithRegistration } from '../types/EventTypes'

export function useFilterEvents(
  events: EventWithRegistration[],
  searchString?: string,
) {
  const isUpcomingOrOngoing = (
    event: EventWithRegistration,
    currentDate: Date,
  ): boolean => {
    const startDate = event.start ? new Date(event.start) : null
    const endDate = event.end ? new Date(event.end) : null

    if (!startDate || !endDate) return false
    return (
      startDate > currentDate ||
      (startDate <= currentDate && endDate >= currentDate)
    )
  }

  const currentDate = useMemo(() => new Date(), [])

  const filteredEvents = useMemo(() => {
    return searchString
      ? events.filter((event) => event.title.includes(searchString))
      : events
  }, [events, searchString])

  const { pastEvents, upcomingAndOngoingEvents } = useMemo(() => {
    const pastEvents: EventWithRegistration[] = []
    const upcomingAndOngoingEvents: EventWithRegistration[] = []

    filteredEvents.forEach((event) => {
      if (isUpcomingOrOngoing(event, currentDate)) {
        upcomingAndOngoingEvents.push(event)
      } else {
        pastEvents.push(event)
      }
    })

    return { pastEvents, upcomingAndOngoingEvents }
  }, [filteredEvents, currentDate])

  return { pastEvents, upcomingAndOngoingEvents }
}
