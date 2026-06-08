import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TreeRowLabel } from './TreeRowLabel'

const meta: Meta<typeof TreeRowLabel> = {
  title: 'Starliner/Molecules/Row Label',

  component: TreeRowLabel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TreeRowLabel>

export const BasicUsage: Story = {
  args: {
    title: 'Some Row Item Name',
    type: 'team',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use case explanation',
      },
    },
  },
  render: (props) => <TreeRowLabel {...props} />,
}
