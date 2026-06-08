import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerCalendar } from './DatePickerCalendar'

const meta: Meta<typeof DatePickerCalendar> = {
  title: 'DL: Falcon/Molecules/Date Picker Calendar',
  component: DatePickerCalendar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePickerCalendar>

export const Single: Story = {
  args: {},
  argTypes: { selected: { control: 'date' } },
  parameters: {
    docs: {
      description: {
        story: 'Single date selection calendar',
      },
    },
  },
  render: ({ ...props }) => <DatePickerCalendar {...props} />,
}
