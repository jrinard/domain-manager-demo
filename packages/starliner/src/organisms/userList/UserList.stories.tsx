import { Button } from '@falcon/buttons'
import { IconButton } from '@spacedock/falcon-ui'
import { noop, times } from 'lodash'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import * as Tdm from '../../../tests/tdm'
import { User } from '../../data/user'

import { UserList } from './UserList'

const meta: Meta<typeof UserList> = {
  title: 'Starliner/Organisms/User List',
  component: UserList,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
}

export default meta
type Story = StoryObj<typeof UserList>

export const Populated: Story = {
  args: {
    items: times<User>(12, (index) => {
      return Tdm.createUser()
    }),
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => <UserList {...props} />,
}

export const IsLoading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => <UserList onSelect={noop} isLoading items={[]} />,
}

export const TrailingActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set a custom trailing actions',
      },
    },
  },
  render: (props) => {
    const users = times<User>(12, (index) => {
      return Tdm.createUser()
    })
    return (
      <UserList
        {...props}
        selectedItems={[users[0], users[2]]}
        items={users}
        trailingBuilder={(user, isSelected) => {
          return isSelected ? (
            <Button size="text" variant="ghost">
              Add
            </Button>
          ) : (
            <IconButton icon="close" color="secondary" />
          )
        }}
      />
    )
  },
}
