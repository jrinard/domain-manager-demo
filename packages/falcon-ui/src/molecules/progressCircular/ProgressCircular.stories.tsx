import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Surface } from '../surface/Surface'

import { ProgressCircular, ProgressCircularProps } from './ProgressCircular'
import { SurfaceStory, SurfaceStoryArgTypes } from '@falcon/storybook'

const meta: Meta<typeof ProgressCircular> = {
  title: 'DL: Falcon/Molecules/Progress Circular',
  component: ProgressCircular,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressCircular>

export const Color: Story = {
  args: {
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary and Secondary are not default',
      },
    },
  },
  render: ({ color, ...props }) => (
    <ProgressCircular color={color} {...props} />
  ),
}

export const ExampleOnSurface: SurfaceStory<ProgressCircularProps> = {
  argTypes: {
    ...SurfaceStoryArgTypes,
    onSurface: {
      ...SurfaceStoryArgTypes.onSurface,
      control: {
        type: 'select' as const,
        options: SurfaceStoryArgTypes.onSurface.options,
      },
    },
  },
  args: {
    onSurface: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a ProgressCircular being on a surface ',
      },
    },
  },
  render: ({ onSurface, ...props }) => (
    <Surface light={onSurface === 'light'}>
      <ProgressCircular {...props} />
    </Surface>
  ),
}
