import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BACalendarWeekdays } from './BACalendarWeekdays'

const meta: Meta<typeof BACalendarWeekdays> = {
  title: 'Domain UI/Organisms/BA Calendar Weekdays',
  component: BACalendarWeekdays,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BACalendarWeekdays>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: () => <BACalendarWeekdays />,
}
