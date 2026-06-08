import { Button } from '@falcon/buttons'
import { omit } from 'lodash'
import {} from 'storybook/test'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as Tdm from '../../../tests/tdm'

import {
  AddRemoveUsersDialog,
  AddRemoveUsersDialogProps,
} from './AddRemoveUsersDialog'

const meta: Meta<typeof AddRemoveUsersDialog> = {
  title: 'Starliner/Organisms/Add Remove Users Dialog',
  component: AddRemoveUsersDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AddRemoveUsersDialog>

export const Included: Story = {
  args: {
    title: 'Add / Remove User',
    includedLabel: 'Included',
    excludedLabel: 'Not Included',
  },
  parameters: {
    docs: {
      description: {
        story: 'Users included in something',
      },
    },
  },
  render: (props) => (
    <AddRemoveUsersDialogWrapper
      {...props}
      includedUsers={[
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
      ]}
      excludedUsers={[]}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Open Dialog'))
  },
}

export const Excluded: Story = {
  args: {
    title: 'Add / Remove User',
    includedLabel: 'Included',
    excludedLabel: 'Not Included',
  },
  parameters: {
    docs: {
      description: {
        story: 'Users already excluded.',
      },
    },
  },
  render: (props) => (
    <AddRemoveUsersDialogWrapper
      {...props}
      includedUsers={[]}
      excludedUsers={[
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
      ]}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Open Dialog'))
  },
}

export const CustomizeRemoveMessage: Story = {
  args: {
    title: 'Add / Remove User',
    includedLabel: 'Included',
    excludedLabel: 'Not Included',
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize the Remove Message',
      },
    },
  },
  render: (props) => (
    <AddRemoveUsersDialogWrapper
      {...props}
      includedUsers={[
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
      ]}
      excludedUsers={[]}
      confirmMessageBuilder={(user) => {
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

const AddRemoveUsersDialogWrapper = ({
  includedUsers,
  excludedUsers,
  ...props
}: AddRemoveUsersDialogProps) => {
  const [open, setOpen] = useState(false)
  const [included, setIncluded] = useState(includedUsers || [])
  const [excluded, setExcluded] = useState(excludedUsers || [])
  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open)
        }}
      >
        Open Dialog
      </Button>
      <AddRemoveUsersDialog
        {...omit(props, 'onAdd', 'onRemove')}
        open={open}
        onOpenChange={setOpen}
        onAdd={(user) => {
          setExcluded(excluded.filter((item) => item.id !== user.id))
          setIncluded([user].concat(included))
        }}
        onRemove={(user) => {
          setIncluded(included.filter((item) => item.id !== user.id))
          setExcluded([user].concat(excluded))
        }}
        includedUsers={included}
        excludedUsers={excluded}
      />
    </>
  )
}
