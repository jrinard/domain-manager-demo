import { useMemo } from 'react'
import { EventWithRegistration } from '../types/EventTypes'
import { groupBy } from 'lodash'
import { format } from 'date-fns'

export function useEventsGroupedByDate(events: EventWithRegistration[]) {
  return useMemo(() => {
    return groupBy(events, (event) => {
      return format(new Date(event.start), 'yyyy-dd-LL')
    })
  }, [events])
}
