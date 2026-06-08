import React from 'react'
import { BAEventListItem } from '../ba-event-list-item/BAEventListItem'
import { SkeletonText, TextHeading } from '@spacedock/falcon-ui'
import { format } from 'date-fns'
import { EventWithRegistration } from '../../types/EventTypes'
import { Dictionary } from 'lodash'
import { WebCast_CVENT } from '@spacedock/serverless-api'

export interface BAEventListProps {
  isLoading?: boolean
  isRefetching?: boolean
  updatingRegistration?: boolean
  date: Date
  events: EventWithRegistration[]
  webcasts: Dictionary<WebCast_CVENT>
  onClickRegister: (event: EventWithRegistration) => void
  onClickEvent: (event: EventWithRegistration) => void
  isPreview?: boolean
}

const BAEventList = ({
  isLoading,
  events,
  updatingRegistration,
  date,
  webcasts,
  onClickRegister,
  onClickEvent,
  isRefetching,
  isPreview = false,
  ...props
}: BAEventListProps) => {
  if (isLoading) {
    return (
      <li className="flex w-full w-full flex-col gap-1">
        <SkeletonText size={'lg'} className="w-full" />
        <SkeletonText className="w-full" />
        <SkeletonText className="w-full" />
      </li>
    )
  }

  return (
    <li className="flex w-full flex-col gap-1">
      <TextHeading size={5} uppercase={false}>
        {format(date, 'LLL dd, EEEE')}
      </TextHeading>
      <ul className="flex w-full flex-col gap-1">
        {events.map((event) => {
          return (
            <BAEventListItem
              isRefetching={isRefetching}
              onClickEvent={onClickEvent}
              key={event.id}
              updatingRegistration={updatingRegistration}
              event={event}
              webcast={webcasts[event.id]}
              onClickRegistered={() => {
                onClickRegister(event)
              }}
              isPreview={isPreview}
            />
          )
        })}
      </ul>
    </li>
  )
}
BAEventList.displayName = 'BAEventList'

export { BAEventList }
