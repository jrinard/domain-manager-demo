import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import * as Tdm from '../../../tests/tdm'
import { UserItem } from './UserItem'

const meta: Meta<typeof UserItem> = {
  title: 'Starliner/Organisms/User Item',
  component: UserItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserItem>

export const Selected: Story = {
  args: {
    item: Tdm.createUser(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays user Information in a Selected State',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ isSelected, ...props }) => (
    <UserItem
      {...props}
      trailingBuilder={(item, isSelected) =>
        isSelected ? <span>I AM SELECTED</span> : <span />
      }
      isSelected
    />
  ),
}
