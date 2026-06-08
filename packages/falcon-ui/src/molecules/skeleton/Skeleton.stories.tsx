import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'DL: Falcon/Molecules/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Skeleton>

type CircleStory = StoryObj<typeof Skeleton.Circle>
export const Circle: CircleStory = {
  args: {
    size: '12',
  },
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: ({ size }) => (
    <div className="flex items-center space-x-4">
      <Skeleton.Circle size={size} />
    </div>
  ),
}

type TextStory = StoryObj<typeof Skeleton.Text>
export const Text: TextStory = {
  args: {
    size: 'base',
    length: 'medium',
  },
  argTypes: {
    size: {
      options: ['sm', 'base', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    length: {
      options: [
        'short',
        'medium',
        'long',
        'xlong',
        '1/6',
        '1/2',
        '1/3',
        '1/4',
        '2/3',
        '3/4',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: ({ size, length }) => (
    <div className="flex flex-col space-y-4">
      <Skeleton.Text size={size} length={length} />
      <Skeleton.Text length="xlong" />
      <Skeleton.Text length="long" />
      <Skeleton.Text length="medium" />
      <Skeleton.Text length="short" />
      <Skeleton.Text length="1/6" />
      <Skeleton.Text length="1/4" />
      <Skeleton.Text length="1/2" />
      <Skeleton.Text length="3/4" />
      <Skeleton.Text length="5/6" />
    </div>
  ),
}

type SquareStory = StoryObj<typeof Skeleton.Square>
export const Square: SquareStory = {
  args: {
    size: '12',
  },
  argTypes: {
    size: {
      options: ['12', '36', '40', '96', '1/2'],
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: ({ size }) => (
    <div className="size-full">
      <Skeleton.Square size={size} />
    </div>
  ),
}
export const Example: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-52" />
      </div>
    </div>
  ),
}
