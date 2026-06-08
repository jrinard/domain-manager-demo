import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DateInput } from './DateInput'

const meta: Meta<typeof DateInput> = {
  title: 'DL: Falcon/Inputs/Date Input',
  component: DateInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  render: ({ ...props }) => <DateInput {...props} />,
}

export const WithStartingDate: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'With value already set defined',
      },
    },
  },
  render: ({ ...props }) => (
    <DateInput {...props} value={new Date('10/15/2023')} />
  ),
}

export const Placeholder: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'With placeholder',
      },
    },
  },
  render: ({ ...props }) => <DateInput {...props} placeholder="Start Date" />,
}

export const DenseDisabled: Story = {
  args: {
    dense: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dense _(smaller / tighter)_',
      },
    },
  },
  render: ({ dense, ...props }) => (
    <DateInput {...props} placeholder="End" dense={dense} />
  ),
}
