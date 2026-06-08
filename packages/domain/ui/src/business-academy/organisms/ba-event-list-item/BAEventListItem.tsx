import React, { useMemo } from 'react'

import { BAEventButton } from '../ba-event-button/BAEventButton'
import { EventWithRegistration } from '../../types/EventTypes'
import { TextBody } from '@spacedock/falcon-ui'
import { differenceInHours, isPast, isToday } from 'date-fns'
import { Button } from '@falcon/buttons'
import { WebCast_CVENT } from '@spacedock/serverless-api'
import { useIsEventWithin5Minutes } from '../../hooks/useIsEventWithin5Minutes'

export interface BAEventListItemProps {
  isRefetching?: boolean
  event: EventWithRegistration
  updatingRegistration?: boolean
  webcast?: WebCast_CVENT
  onClickRegistered: () => void
  onClickEvent: (event: EventWithRegistration) => void
  isPreview?: boolean
}

const BAEventListItem = ({
  isRefetching,
  event,
  updatingRegistration,
  webcast,
  onClickRegistered,
  onClickEvent,
  isPreview = false,
  ...props
}: BAEventListItemProps) => {
  const eventDate = new Date(event.start ?? '')
  const isToady = isToday(eventDate)
  const hourDif = differenceInHours(eventDate, new Date())
  const within5Minutes = useIsEventWithin5Minutes(event)
  const eventPast = useMemo(() => {
    return isPast(new Date(event.end))
  }, [event.end])
  return (
    <li
      className={`flex w-full items-center ${isPreview ? 'gap-2' : 'justify-between gap-1'} overflow-hidden py-1`}
    >
      <Button
        onClick={() => {
          onClickEvent(event)
        }}
        variant="ghost-primary"
        size={'text-thin'}
        className={`m-0 p-0 hover:underline ${isPreview ? 'flex-1 overflow-hidden' : 'overflow-hidden'}`}
      >
        <TextBody className="block w-full truncate text-left" size={'s'}>
          {event.title}
        </TextBody>
      </Button>
      {!isPreview && isToady && hourDif <= 6 && (
        <TextBody color={'pink100/60'} size={'xs'}>
          {hourDif === 1 ? 'in 1 hour' : `in ${hourDif} hours`}
        </TextBody>
      )}
      {!eventPast && (
        <div className={isPreview ? 'flex-shrink-0' : ''}>
          <BAEventButton
            updatingRegistration={updatingRegistration}
            isRefetching={isRefetching}
            link={webcast?._links?.join.href}
            isWithin5Minutes={within5Minutes}
            onClickRegister={onClickRegistered}
            registered={
              !!event.registration && event.registration.status === 'Accepted'
            }
            thin
          />
        </div>
      )}
    </li>
  )
}
BAEventListItem.displayName = 'BAEventListItem'

export { BAEventListItem }
