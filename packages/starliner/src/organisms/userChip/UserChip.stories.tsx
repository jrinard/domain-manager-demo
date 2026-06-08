import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { UserChip, UserChipProps } from './UserChip'
import { createUser } from '../../../tests/tdm'
import { TooltipProvider } from '@spacedock/falcon-ui'

const meta: Meta<typeof UserChip> = {
  title: 'Starliner/Organisms/User Chip',
  component: UserChip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<UserChipProps>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const InOffice: Story = {
  args: {
    displayName: createUser().displayName,
    avatar: createUser().avatar,
    defaultColor: 'neutral',
  },
  parameters: {
    docs: {
      description: {
        story: 'When the user is "In the Office" (default)',
      },
    },
  },
  render: ({ displayName, avatar, ...props }) => (
    <UserChip displayName={displayName} avatar={avatar} {...props} />
  ),
}

export const Deactivated: Story = {
  args: {
    displayName: createUser().displayName,
    avatar: createUser().avatar,
  },
  parameters: {
    docs: {
      description: {
        story: 'When the user is "Deactivated"',
      },
    },
  },
  render: ({ displayName, avatar, ...props }) => (
    <TooltipProvider>
      <UserChip
        displayName={displayName}
        avatar={avatar}
        status="deactivated"
        {...props}
      />
    </TooltipProvider>
  ),
}

export const OutOfOffice: Story = {
  args: {
    displayName: createUser().displayName,
    avatar: createUser().avatar,
    message:
      'The out of office message that the user has set will show up as this tool tip while they are hovering over the user chip of anyone who is out of office',
  },
  parameters: {
    docs: {
      description: {
        story: 'When the user is "Deactivated"',
      },
    },
  },
  render: ({ displayName, avatar, message, ...props }) => (
    <TooltipProvider>
      <UserChip
        displayName={displayName}
        avatar={avatar}
        status="out-of-office"
        message={message}
        {...props}
      />
    </TooltipProvider>
  ),
}

export const Pending: Story = {
  args: {
    displayName: createUser().displayName,
    avatar: createUser().avatar,
    message: 'The invitation is pending',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pending invitation or similar',
      },
    },
  },
  render: ({ displayName, avatar, message, ...props }) => (
    <TooltipProvider>
      <UserChip
        displayName={displayName}
        avatar={avatar}
        status="pending"
        message={message}
        {...props}
      />
    </TooltipProvider>
  ),
}
