import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { MultiStatusProgressBar } from './MultiStatusProgressBar'

const meta: Meta<typeof MultiStatusProgressBar> = {
  title: 'DL: Falcon/Molecules/Multi-Status Progress Bar',
  component: MultiStatusProgressBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MultiStatusProgressBar>

export const ThreeColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All three colors set with empty space',
      },
    },
  },
  render: ({ ...props }) => (
    <MultiStatusProgressBar
      {...props}
      items={[
        { color: 'success', label: 'Passed', percent: 32 },
        { color: 'warn', label: 'Inprogress', percent: 11 },
        { color: 'error', label: 'Failed', percent: 5 },
      ]}
    />
  ),
}

export const TwoColorsAt100Percent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'three colors at 100% (no empty bar)',
      },
    },
  },
  render: ({ ...props }) => (
    <MultiStatusProgressBar
      {...props}
      items={[
        { color: 'success', label: 'Passed', percent: 70 },
        { color: 'warn', label: 'Inprogress', percent: 30 },
      ]}
    />
  ),
}
