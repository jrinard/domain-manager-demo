import { useMemo } from 'react'
import { EventWithRegistration } from '../types/EventTypes'

export function useFilteredDescription(event?: EventWithRegistration) {
  return useMemo(() => {
    if (event && event.description) {
      return event.description.replace(/<[^>]*>/g, '')
    }
    return ''
  }, [event])
}
