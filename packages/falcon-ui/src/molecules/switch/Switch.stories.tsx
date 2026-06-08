import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'DL: Falcon/Molecules/Switch',
  component: Switch,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Switch>

export const Enabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Enabled switch',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <Switch {...props} />,
}

export const Disabled: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Disabled switch',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <Switch {...props} disabled />,
}

export const ProgrammaticallyOn: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Programmatically set checked state',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <Switch {...props} checked />,
}
