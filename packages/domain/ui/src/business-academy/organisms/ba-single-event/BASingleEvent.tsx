import React, { useMemo } from 'react'

import { SkeletonSquare, TextBody, TextHeading } from '@spacedock/falcon-ui'
import { BACalendar } from '../ba-calendar/BACalendar'
import _ from 'lodash'
import { EventWithRegistration } from '../../types/EventTypes'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'

import { useEventStrings } from '../../hooks/useEventStrings'
import { BAEventButton } from '../ba-event-button/BAEventButton'
import { WebCast_CVENT } from '@spacedock/serverless-api'
import { isPast } from 'date-fns'
import { useFilteredDescription } from '../../hooks/useFilteredDescription'
import { useIsEventWithin5Minutes } from '../../hooks/useIsEventWithin5Minutes'

export interface BASingleEventProps {
  isLoading?: boolean
  event?: EventWithRegistration
  webcast?: WebCast_CVENT
  updatingRegistration?: boolean
  onClickRegister: () => void
  onClickBack: () => void
}

const BASingleEvent = ({
  isLoading,
  event,
  updatingRegistration,
  webcast,
  onClickRegister,
  onClickBack,
  ...props
}: BASingleEventProps) => {
  const { dateString, timeString } = useEventStrings(event)
  const filteredDesc = useFilteredDescription(event)
  const eventPast = useMemo(() => {
    return isPast(new Date(event?.end ?? ''))
  }, [event?.end])
  const within5Minutes = useIsEventWithin5Minutes(event)

  return (
    <div className="flex flex-col gap-10 pt-3">
      <div>
        <Button
          size={'text-thin'}
          variant="ghost-primary"
          className="underline"
          onClick={onClickBack}
        >
          <Icon icon="chevron-left" />
          Back
        </Button>
      </div>
      <div className="flex gap-8">
        <BACalendar
          selected={event ? new Date(event.start ?? '') : undefined}
          onDateSelect={_.noop}
          isLoading={isLoading}
          disableSelection
        />
        {isLoading && <SkeletonSquare className="w-5/8 h-72" />}
        {!isLoading && event && (
          <div className="w-5/8 flex flex-col gap-3">
            <TextHeading size={4} uppercase={false}>
              {event.title}
            </TextHeading>
            <div className="flex gap-8">
              <TextBody size={'s'} color={'pink100/60'}>
                {dateString}
              </TextBody>
              <TextBody size={'s'} color={'pink100/60'}>
                {timeString}
              </TextBody>
            </div>
            <div className="flex flex-col gap-3">
              <TextBody>{filteredDesc}</TextBody>
              {!eventPast && (
                <div className="flex gap-3">
                  <BAEventButton
                    updatingRegistration={updatingRegistration}
                    registered={
                      !!event.registration &&
                      event.registration.status === 'Accepted'
                    }
                    onClickRegister={onClickRegister}
                  />
                  {within5Minutes &&
                    !!event.registration &&
                    event.registration.status === 'Accepted' && (
                      <BAEventButton
                        updatingRegistration={updatingRegistration}
                        isWithin5Minutes
                        registered
                        link={webcast?._links?.join.href}
                        onClickRegister={_.noop}
                      />
                    )}
                </div>
              )}
              {!eventPast && (
                <TextBody size={'xs'} color={'pink100/60'}>
                  {webcast?._links?.join.href}
                </TextBody>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
BASingleEvent.displayName = 'BASingleEvent'

export { BASingleEvent }
