import React, { useMemo, useState, useRef, useEffect } from 'react'
import { BACalendar } from '../ba-calendar/BACalendar'
import { TextInput } from '@falcon/inputs'
import { Button } from '@falcon/buttons'
import { EventWithRegistration } from '../../types/EventTypes'
import { useEventsGroupedByDate } from '../../hooks/useEventsGroupedByDate'
import { BAAllEventsList } from '../ba-all-events-list/BAAllEventsList'
import { WebCast_CVENT } from '@spacedock/serverless-api'
import { Dictionary } from 'lodash'
import { useFilterEvents } from '../../hooks/useFilterEvents'
import { isBefore, isEqual, parse } from 'date-fns'

export interface BAAllEventsProps {
  isLoading?: boolean
  events: EventWithRegistration[]
  updatingRegistration?: boolean
  onClickClose: () => void
  onClickRegister: (event: EventWithRegistration) => void
  onClickEvent: (event: EventWithRegistration) => void
  webcasts: Dictionary<WebCast_CVENT>
}

const BAAllEvents = ({
  isLoading,
  events,
  updatingRegistration,
  onClickEvent,
  onClickRegister,
  onClickClose,
  webcasts,
  ...props
}: BAAllEventsProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [search, setSearch] = useState('')
  const dateRefs = useRef<{ [key: string]: HTMLLIElement | null }>({})

  const { upcomingAndOngoingEvents } = useFilterEvents(events)
  const searchFilteredEvents = useMemo(() => {
    return upcomingAndOngoingEvents.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase()),
    )
  }, [upcomingAndOngoingEvents, search])
  const eventsGroupedByDate = useEventsGroupedByDate(searchFilteredEvents)

  useEffect(() => {
    if (!selectedDate) return

    const dates = Object.keys(eventsGroupedByDate)

    const targetDate = dates.find((date) => {
      const dateDate = parse(date, 'yyyy-dd-LL', new Date())
      return isEqual(dateDate, selectedDate) || isBefore(selectedDate, dateDate)
    })

    if (targetDate && dateRefs.current[targetDate]) {
      dateRefs.current[targetDate]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [selectedDate, eventsGroupedByDate])

  return (
    <div className="flex w-full gap-8" style={{ height: 'calc(100vh - 188px' }}>
      <BACalendar
        isLoading={isLoading}
        onDateSelect={setSelectedDate}
        selected={selectedDate}
      />
      <div className="h-full w-px bg-neutral-600/60" />
      <div className="flex h-full flex-1 flex-col">
        <div className="mb-3 flex w-full flex-none items-center justify-between">
          <TextInput
            className="w-3/4"
            leadingIcon="search"
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <Button
            size={'text-thin'}
            variant="ghost-primary"
            className="underline"
            onClick={onClickClose}
          >
            Close
          </Button>
        </div>
        <ul
          className="flex w-full flex-col gap-8 overflow-y-auto overflow-x-hidden"
          style={{ height: 'var(--remaining-height)' }}
        >
          {Object.keys(eventsGroupedByDate).map((key) => {
            const dateEvents = eventsGroupedByDate[key]
            return (
              <BAAllEventsList
                ref={(el) => (dateRefs.current[key] = el)}
                key={key}
                webcasts={webcasts}
                updatingRegistration={updatingRegistration}
                isLoading={isLoading}
                events={dateEvents}
                date={new Date(dateEvents[0].start)}
                onClickRegister={onClickRegister}
                onClickEvent={onClickEvent}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
BAAllEvents.displayName = 'BAAllEvents'

export { BAAllEvents }
