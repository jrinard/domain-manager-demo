import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BACalendar } from './BACalendar'

const meta: Meta<typeof BACalendar> = {
  title: 'Domain UI/Organisms/BA Calendar',
  component: BACalendar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BACalendar>

export const Noevents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No events scheduled',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BACalendar {...props} />,
}
