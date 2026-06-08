import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerInput } from './DatePickerInput'

const meta: Meta<typeof DatePickerInput> = {
  title: 'DL: Falcon/Molecules/inputs/Date Picker Input',
  component: DatePickerInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePickerInput>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic implementation',
      },
    },
  },
  render: ({ ...props }) => <DatePickerInput {...props} />,
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
    <DatePickerInput {...props} date={new Date('10/15/2023')} />
  ),
}
