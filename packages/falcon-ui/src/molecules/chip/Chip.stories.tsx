import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { createAvatarProps } from '../../../tests/tdm'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'DL: Falcon/Molecules/Chip',
  component: Chip,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          {Story()}
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof Chip>

export const LabelOnly: Story = {
  args: {
    label: 'Candice Wu',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label only',
      },
    },
  },
  render: (props) => <Chip {...props} label={props.label} />,
}

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Color options',
      },
    },
  },
  render: (props) => (
    <>
      <Chip {...props} label="Primary (default)" />
      <Chip {...props} label="Secondary" color="secondary" />
      <Chip {...props} label="Info" color="info" />
      <Chip {...props} label="Warn" color="warn" />
      <Chip {...props} label="Success" color="success" />
      <Chip {...props} label="Error" color="error" />
    </>
  ),
}

const user = createAvatarProps()
export const Avatar: Story = {
  args: {
    label: user.name,
    avatar: user,
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar and label',
      },
    },
  },
  render: (props) => <Chip {...props} label={props.label} />,
}

export const AvatarDense: Story = {
  args: {
    label: user.name,
    avatar: user,
    dense: true,
    color: 'neutral',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar and label and dense',
      },
    },
  },
  render: (props) => <Chip {...props} label={props.label} />,
}

export const LeadingIconAndAvatar: Story = {
  args: {
    label: user.name,
    avatar: user,
    leadingIcon: 'clock-outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar and Lead Icon',
      },
    },
  },
  render: (props) => <Chip {...props} />,
}

export const TrailingIcon: Story = {
  args: {
    label: createAvatarProps().name,
    trailingIcon: 'close',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Trailing Icon can be used to indicate removal from a list of chips',
      },
    },
  },
  render: (props) => <Chip {...props} />,
}

export const TrailingIconWithClick: Story = {
  args: {
    label: createAvatarProps().name,
    trailingIcon: 'close',
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: 'Avatar and Lead Icon',
      },
    },
  },
  render: (props) => (
    <Chip {...props} onTrailingIconClick={props.onTrailingIconClick} />
  ),
}

export const LeadingIconWithClick: Story = {
  args: {
    label: createAvatarProps().name,
    leadingIcon: 'folder-move',
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: 'Avatar and Lead Icon',
      },
    },
  },
  render: (props) => (
    <Chip {...props} onLeadingIconClick={props.onLeadingIconClick} />
  ),
}

export const TrailingIconAndAvatar: Story = {
  args: {
    label: user.name,
    avatar: user,
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar and Trailing Icon with label',
      },
    },
  },
  render: (props) => (
    <Chip {...props} label={props.label} trailingIcon="close" />
  ),
}
