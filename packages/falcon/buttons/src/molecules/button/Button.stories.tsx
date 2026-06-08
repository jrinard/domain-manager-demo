import { Icon } from '@falcon/icons'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'DL: Falcon/Molecules/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  render: ({ ...props }) => (
    <Button variant="primary" {...props}>
      Send
    </Button>
  ),
}

export const PrimaryDisabled: Story = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  render: ({ ...props }) => (
    <Button variant="primary" disabled {...props}>
      Send
    </Button>
  ),
}

export const Secondary: Story = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  render: ({ ...props }) => (
    <Button variant="secondary" {...props}>
      Send
    </Button>
  ),
}

export const SecondaryDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'secondary disabled',
      },
    },
  },
  render: ({ ...props }) => (
    <Button variant="secondary" disabled {...props}>
      Send
    </Button>
  ),
}

export const Destructive: Story = {
  render: ({ ...props }) => (
    <Button variant="danger" {...props}>
      Send
    </Button>
  ),
}

export const DestructiveDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'destructive disabled',
      },
    },
  },
  render: ({ ...props }) => (
    <Button variant="danger" disabled {...props}>
      Send
    </Button>
  ),
}

export const Ghost: Story = {
  render: ({ ...props }) => (
    <Button variant="ghost" {...props}>
      Send
    </Button>
  ),
}

export const GhostDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ghost (text) disabled',
      },
    },
  },
  render: ({ ...props }) => (
    <Button variant="ghost" disabled {...props}>
      Send
    </Button>
  ),
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Rule**: Buttons in a linear group should follow this pattern: One Primary, One Secondary, and all others are `ghost`',
      },
    },
  },
  render: () => {
    return (
      <div className={`flex flex-row flex-nowrap`}>
        <Button variant="secondary">Secondary</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost">Boo</Button>
      </div>
    )
  },
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => (
    <Button>
      <Icon icon="person-add" />
      Add Person
    </Button>
  ),
}

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const LongTextContainer = () => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState('Long Messages Are Fun!')
  const [isLong, setIsLong] = useState(true)

  // Sets a click handler to change the label's value
  const handleOnChange = () => {
    setIsLong(!isLong)
    setValue(isLong ? 'Long Messages Are Fun!' : 'Short')
  }
  return <Button onClick={handleOnChange}>{value}</Button>
}

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Long text inside a button. _Click to show short_',
      },
    },
  },
  render: () => <LongTextContainer />,
}
