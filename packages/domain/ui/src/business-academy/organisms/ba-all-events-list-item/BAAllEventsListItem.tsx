import React, { useMemo } from 'react'
import { EventWithRegistration } from '../../types/EventTypes'
import { TextBody } from '@spacedock/falcon-ui'
import { useEventStrings } from '../../hooks/useEventStrings'
import { BAEventButton } from '../ba-event-button/BAEventButton'
import { Button } from '@falcon/buttons'
import { WebCast_CVENT } from '@spacedock/serverless-api'
import { isPast } from 'date-fns'
import { useFilteredDescription } from '../../hooks/useFilteredDescription'
import { useIsEventWithin5Minutes } from '../../hooks/useIsEventWithin5Minutes'

export interface BAAllEventsListItemProps {
  event: EventWithRegistration
  updatingRegistration?: boolean
  onClickEvent: () => void
  onClickRegister: () => void
  registered?: boolean
  webcast?: WebCast_CVENT
}

const BAAllEventsListItem = ({
  event,
  registered,
  updatingRegistration,
  webcast,
  onClickRegister,
  onClickEvent,
  ...props
}: BAAllEventsListItemProps) => {
  const { timeString } = useEventStrings(event)
  const filteredDesc = useFilteredDescription(event)
  const eventPast = useMemo(() => {
    return isPast(new Date(event.end))
  }, [event.end])
  const within5Minutes = useIsEventWithin5Minutes(event)
  return (
    <li className="flex w-full flex-col gap-2">
      <Button
        variant="ghost-primary"
        size={'fit'}
        filled={false}
        className="flex flex-col gap-2 text-left"
        onClick={onClickEvent}
      >
        <div className="flex w-full items-center justify-between gap-3">
          <TextBody
            className="truncate hover:underline"
            size={'l'}
            color={eventPast ? 'pink100/60' : undefined}
          >
            {event.title}
          </TextBody>
          {!eventPast && (
            <BAEventButton
              updatingRegistration={updatingRegistration}
              onClickRegister={(event) => {
                event.stopPropagation()
                onClickRegister()
              }}
              link={webcast?._links?.join.href}
              registered={
                !!event.registration && event.registration.status === 'Accepted'
              }
              isWithin5Minutes={within5Minutes}
            />
          )}
        </div>
        <TextBody
          size={'s'}
          color={eventPast ? 'pink100/30' : 'pink100/60'}
          className="w-full"
        >
          {timeString}
        </TextBody>
        <TextBody
          size={'s'}
          color={eventPast ? 'pink100/30' : 'pink100/60'}
          className="w-full"
        >
          {filteredDesc}
        </TextBody>
      </Button>
    </li>
  )
}
BAAllEventsListItem.displayName = 'BAAllEventsListItem'

export { BAAllEventsListItem }
