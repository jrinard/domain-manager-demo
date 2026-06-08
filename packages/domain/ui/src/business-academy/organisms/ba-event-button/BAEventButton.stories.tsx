import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BAEventButton } from './BAEventButton'

const meta: Meta<typeof BAEventButton> = {
  title: 'Domain Ui/Organisms/BA Event Button',
  component: BAEventButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BAEventButton>

export const RegisteredAndSoon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BAEventButton {...props} registered isWithin5Minutes />
  ),
}

export const RegisteredAndSoonThin: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BAEventButton {...props} registered isWithin5Minutes thin />
  ),
}

export const RegisteredAndSoonDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BAEventButton
      {...props}
      registered
      isWithin5Minutes
      updatingRegistration
    />
  ),
}

export const Registered: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BAEventButton {...props} registered />,
}

export const RegisteredThin: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BAEventButton {...props} registered thin />,
}

export const RegisteredAndDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BAEventButton {...props} registered updatingRegistration />
  ),
}

export const Unregistered: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BAEventButton {...props} />,
}

export const UnregisteredThin: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BAEventButton {...props} thin />,
}

export const UnregisteredAndDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Data loaded and has length. Helpful for lists of data.',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BAEventButton {...props} updatingRegistration />,
}
