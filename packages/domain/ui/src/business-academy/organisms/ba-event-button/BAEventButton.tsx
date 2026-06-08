import React from 'react'

import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'
import { Tooltip } from '@spacedock/falcon-ui'

export interface BAEventButtonProps {
  onClickRegister: (event: React.MouseEvent<HTMLButtonElement>) => void
  thin?: boolean
  link?: string
  registered?: boolean
  isWithin5Minutes?: boolean
  updatingRegistration?: boolean
  isRefetching?: boolean
}

const BAEventButton = ({
  onClickRegister,
  thin,
  link,
  registered,
  isWithin5Minutes,
  updatingRegistration,
  isRefetching,
  ...props
}: BAEventButtonProps) => {
  if (isWithin5Minutes) {
    return (
      <a target="_blank" href={link} rel="noreferrer">
        <Button
          size={thin ? 'text' : 'medium'}
          className={'cursor-not-allowed border border-white opacity-50'}
          variant={'ghost'}
        >
          <Tooltip
            className="mt-1"
            content={'The link to this event will be sent to you via email.'}
            contentClassName={'z-[9999]'}
          >
            <span className="ml-2 inline-block">
              <Icon icon="info-outline" />
            </span>
          </Tooltip>
          {'Registered'}
        </Button>
      </a>
    )
  }

  if (registered) {
    return (
      <Button
        size={thin ? 'text' : 'medium'}
        className={'border border-white'}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          if (updatingRegistration) {
            return
          }
          onClickRegister(event)
        }}
        variant={'ghost'}
        disabled={updatingRegistration || isRefetching}
      >
        {'Registered'} {<Icon icon="check" />}
      </Button>
    )
  }

  return (
    <Button
      size={thin ? 'text' : 'medium'}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (updatingRegistration) {
          return
        }
        onClickRegister(event)
      }}
      variant={'secondary'}
      disabled={updatingRegistration || isRefetching}
    >
      Register
    </Button>
  )
}
BAEventButton.displayName = 'BAEventButton'

export { BAEventButton }
