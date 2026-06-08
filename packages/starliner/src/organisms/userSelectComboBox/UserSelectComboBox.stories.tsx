import { omit, times } from 'lodash'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import * as Tdm from '../../../tests/tdm'

import { UserSelectComboBox, UserSelectComboBoxProps } from './UserSelectComboBox'

const meta: Meta<typeof UserSelectComboBox> = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  title: 'Starliner/Organisms/User Select ComboBox',
  component: UserSelectComboBox,
  tags: ['autodocs'],
}

const TEST_USERS = [
  Tdm.createUser({ displayName: 'John Doe' }),
  Tdm.createUser(),
  Tdm.createUser(),
  Tdm.createUser(),
  Tdm.createUser(),
  Tdm.createUser(),
  Tdm.createUser(),
  Tdm.createUser(),
]

export default meta
type Story = StoryObj<typeof UserSelectComboBox>

export const IsLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the data is loading',
      },
    },
  },
  render: ({ ...props }) => <UserSelectComboBox {...props} isLoading />,
}

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the data is loading',
      },
    },
  },
  render: ({ ...props }) => (
    <UserSelectComboBox {...props} isLoading placeholder="Assign a member" />
  ),
}

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded but there are no users available.',
      },
    },
  },
  render: ({ ...props }) => (
    <UserSelectComboBox {...props} isLoading={false} items={[]} />
  ),
}

export const Populated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
  },
  render: ({ ...props }) => (
    <UserSelectComboBoxStateful
      {...props}
      items={TEST_USERS}
    />
  ),
}

export const ValueDefined: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
  },
  render: ({ ...props }) => (
    <UserSelectComboBox
      {...props}
      value={`${TEST_USERS[0]?.id}`}
      isLoading={false}
      items={TEST_USERS}
    />
  ),
}

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
  },
  render: ({ ...props }) => (
    <UserSelectComboBox
      {...props}
      value={232424}
      items={[
        Tdm.createUser({displayName: 'John Doe'}),
        ...times(100).map((index) => ({
          ...Tdm.createUser({}),
          value: index,
        })),
      ]}
    />
  ),
}

export const Fill: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`fill` set to true (present) gives it that filled appearance some of the designs have.',
      },
    },
  },
  render: ({ ...props }) => (
    <UserSelectComboBoxStateful
        {...props}
        fill
        items={TEST_USERS}
    />
  ),
}

const UserSelectComboBoxStateful = ({ value, ...props }: UserSelectComboBoxProps)  => {
  const [selectedID, updateSelectedID] = React.useState(value)

  return <UserSelectComboBox {...omit(props, 'onChange')} value={selectedID} onChange={updateSelectedID} />
}
