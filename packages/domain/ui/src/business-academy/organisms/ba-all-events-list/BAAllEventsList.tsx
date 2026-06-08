import React, { forwardRef, useMemo } from 'react'

import { SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import { EventWithRegistration } from '../../types/EventTypes'
import { format, isPast } from 'date-fns'
import { BAAllEventsListItem } from '../ba-all-events-list-item/BAAllEventsListItem'
import { WebCast_CVENT } from '@spacedock/serverless-api'
import { Dictionary } from 'lodash'

export interface BAAllEventsListProps {
  isLoading?: boolean
  date: Date
  events: EventWithRegistration[]
  updatingRegistration?: boolean
  webcasts: Dictionary<WebCast_CVENT>
  onClickRegister: (event: EventWithRegistration) => void
  onClickEvent: (event: EventWithRegistration) => void
}

export const BAAllEventsList = forwardRef<HTMLLIElement, BAAllEventsListProps>(
  (
    {
      webcasts,
      updatingRegistration,
      isLoading,
      events,
      date,
      onClickRegister,
      onClickEvent,
    },
    ref,
  ) => {
    const datePast = useMemo(() => {
      return isPast(date)
    }, [date])
    if (isLoading) {
      return (
        <li ref={ref} className="flex w-full flex-col gap-5">
          <SkeletonText className="w-full" size={'2xl'} />
          <div className="flex w-full flex-col gap-1">
            <SkeletonText className="w-full" />
            <SkeletonText className="w-full" />
          </div>
        </li>
      )
    }

    return (
      <li ref={ref} className="flex w-full flex-col gap-5">
        <TextHeading
          uppercase={false}
          size={3}
          color={datePast ? 'pink100/60' : undefined}
        >
          {format(date, 'LLL dd, EEEE')}
        </TextHeading>
        <ul className="flex w-full flex-col gap-1">
          {events.map((event) => {
            return (
              <BAAllEventsListItem
                updatingRegistration={updatingRegistration}
                key={event.id}
                onClickEvent={() => {
                  onClickEvent(event)
                }}
                webcast={webcasts[event.id]}
                event={event}
                onClickRegister={() => {
                  onClickRegister(event)
                }}
              />
            )
          })}
        </ul>
      </li>
    )
  },
)

BAAllEventsList.displayName = 'BAAllEventsList'
