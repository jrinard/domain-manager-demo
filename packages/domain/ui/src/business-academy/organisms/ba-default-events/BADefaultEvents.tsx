import React, { useState } from 'react'

import { TextBody, TextHeading } from '@spacedock/falcon-ui'
import { BACalendar } from '../ba-calendar/BACalendar'
import { Button } from '@falcon/buttons'
import { BAEventList } from '../ba-event-list/BAEventList'
import { EventWithRegistration } from '../../types/EventTypes'
import { useFilterEvents } from '../../hooks/useFilterEvents'
import { useEventsGroupedByDate } from '../../hooks/useEventsGroupedByDate'
import { Dictionary } from 'lodash'
import { WebCast_CVENT } from '@spacedock/serverless-api'
import { use5EventsAfterDate } from '../../hooks/use5EventsAfterDate'

export interface BADefaultEventsProps {
  isLoading?: boolean
  isRefetching?: boolean
  updatingRegistration?: boolean
  events: EventWithRegistration[]
  webcasts: Dictionary<WebCast_CVENT>
  onClickSeeAll: () => void
  onClickRegister: (event: EventWithRegistration) => void
  onClickEvent: (event: EventWithRegistration) => void
  isPreview?: boolean
}

const BADefaultEvents = ({
  isLoading,
  isRefetching,
  events,
  updatingRegistration,
  webcasts,
  onClickSeeAll,
  onClickRegister,
  onClickEvent,
  isPreview = false,
  ...props
}: BADefaultEventsProps) => {
  const { upcomingAndOngoingEvents } = useFilterEvents(events)
  const eventsGroupedByDate = useEventsGroupedByDate(upcomingAndOngoingEvents)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const displayDays = use5EventsAfterDate(eventsGroupedByDate, selectedDate)

  return (
    <div className={`flex w-full min-w-0 ${isPreview ? 'gap-3' : 'gap-8'}`}>
      <BACalendar
        onDateSelect={(date) => {
          setSelectedDate(date ?? new Date())
        }}
        isLoading={isLoading}
        selected={selectedDate}
      />
      <div className="h-full w-px bg-neutral-600/60" />
      <div
        className={`flex w-full min-w-0 flex-col ${isPreview ? 'gap-1' : 'gap-5'}`}
      >
        <div className="flex items-center justify-between">
          {!isPreview && (
            <TextHeading size={3} uppercase={false}>
              Upcoming Events
            </TextHeading>
          )}
          <div className={isPreview ? 'ml-auto' : ''}>
            <Button
              onClick={onClickSeeAll}
              variant="ghost-primary"
              size={'text-thin'}
              className="underline"
            >
              See all
            </Button>
          </div>
        </div>
        <ul
          className={`flex flex-col ${isPreview ? 'w-96 gap-1' : 'min-w-0 gap-3'}`}
        >
          {Object.keys(displayDays).map((key) => {
            const dateEvents = displayDays[key]
            if (!dateEvents || !dateEvents.length) {
              return (
                <li key={'N/A'}>
                  <TextBody color={'pink100/60'}>
                    No Events On The Selected Day
                  </TextBody>
                </li>
              )
            }
            return (
              <BAEventList
                key={key}
                updatingRegistration={updatingRegistration}
                isLoading={isLoading}
                isRefetching={isRefetching}
                events={dateEvents}
                webcasts={webcasts}
                date={new Date(dateEvents[0].start)}
                onClickRegister={(event) => {
                  onClickRegister(event)
                }}
                onClickEvent={onClickEvent}
                isPreview={isPreview}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
BADefaultEvents.displayName = 'BADefaultEvents'

export { BADefaultEvents }
