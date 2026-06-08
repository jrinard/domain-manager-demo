import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { IconButton, IconButtonProps } from './IconButton'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof IconButton> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/Icon Button',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Basic: Story = {
  args: {
    icon: 'search',
    size: 'base',
  },
  render: ({ icon, size }) => <IconButton icon={icon} size={size} />,
}

export const Dense: Story = {
  args: {
    icon: 'search',
    size: 'base',
    dense: true,
  },
  render: ({ icon, size, dense }) => (
    <IconButton dense={dense} icon={icon} size={size} />
  ),
}

export const ExampleTaskBar: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Example of several button icons next to each other',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-row gap-4">
        <IconButton icon="refresh" />
        <IconButton icon="add-task" />
      </div>
    )
  },
}

export const ExampleOnSurface: SurfaceStory<IconButtonProps> = {
  argTypes: {
    ...SurfaceStoryArgTypes,
    icon: { control: { type: 'select' as const } },
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
    icon: 'search',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a Icon being on a surface ',
      },
    },
  },
  render: ({ onSurface, icon, size }) => (
    <SurfaceForStory surface={onSurface}>
      <IconButton icon={icon} size={size} />
    </SurfaceForStory>
  ),
}
