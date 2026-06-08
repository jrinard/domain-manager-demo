import {} from 'storybook/test'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@falcon/buttons'
import * as Tdm from '../../../tests/tdm'
import { User } from '../../data/user'

import {
  RemoveUserConfirmDialog,
  RemoveUserConfirmDialogProps,
} from './RemoveUserConfirmDialog'

const meta: Meta<typeof RemoveUserConfirmDialog> = {
  title: 'Starliner/Organisms/Remove User Confirm Dialog',
  component: RemoveUserConfirmDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RemoveUserConfirmDialog>

const RemoveUserConfirmDialogExample = (
  props: RemoveUserConfirmDialogProps,
) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant={'primary'}
        onClick={() => {
          setOpen(!open)
        }}
      >
        Open Dialog
      </Button>
      <RemoveUserConfirmDialog
        {...props}
        confirmingRemoveOf={
          open ? Tdm.createUser({ displayName: 'Glen Daniel' }) : undefined
        }
        onConfirm={(user: User | undefined) => {
          setOpen(false)
        }}
      />
    </>
  )
}

export const DefaultConfirm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the default message',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <RemoveUserConfirmDialogExample {...props} title="Remove Attendee" />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Open Dialog'))
  },
}

export const CustomConfirm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set the confirmation message specific for your application',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <RemoveUserConfirmDialogExample
      {...props}
      title="Remove Participant"
      messageBuilder={(user) => {
        return (
          <span>
            Are you sure you want to remove{' '}
            {user ? user.displayName : 'No user'} from the conversation?
          </span>
        )
      }}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Open Dialog'))
  },
}
