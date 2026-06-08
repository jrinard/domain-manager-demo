import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DateInput } from './DateInput'

const meta: Meta<typeof DateInput> = {
  title: 'DL: Falcon/Molecules/inputs/Legacy Date Input',
  component: DateInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic implementation',
      },
    },
  },
  render: ({ ...props }) => <DateInput {...props} />,
}

export const WithStartingDate: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'With props date',
      },
    },
  },
  render: ({ ...props }) => (
    <DateInput {...props} date={new Date('10/15/2023')} />
  ),
}
