import { useMemo } from 'react'
import { EventWithRegistration } from '../types/EventTypes'
import { format } from 'date-fns'
import { getTimeZoneAbbreviation } from '../functions/EventTimeStringFunctions'

export function useEventStrings(event: EventWithRegistration | undefined) {
  return useMemo(() => {
    if (!event || !event.start || !event.end) {
      return { dateString: '', timeString: '' }
    }
    const eventStartDate = new Date(event.start)
    const eventEndDate = new Date(event.end)

    // Check if the dates are valid
    if (isNaN(eventStartDate.getTime()) || isNaN(eventEndDate.getTime())) {
      return { dateString: 'Invalid date', timeString: 'Invalid date' }
    }

    //* Create the date string using local formatting
    const dateString = format(eventStartDate, 'EEEE, LLL dd, y')

    //* Determine local time zone and its abbreviation
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const localTZAbbrev = getTimeZoneAbbreviation(localTimeZone)

    //* Format the start and end times in the user's local time zone
    const localTimeStart = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: localTimeZone,
      hour12: true,
    }).format(eventStartDate)
    const localTimeEnd = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: localTimeZone,
      hour12: true,
    }).format(eventEndDate)

    const timeString = `${localTimeStart} - ${localTimeEnd} ${localTZAbbrev}`

    return { dateString, timeString }
  }, [event])
}
