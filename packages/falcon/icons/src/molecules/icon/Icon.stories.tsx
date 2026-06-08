import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Icon, IconProps } from './Icon'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof Icon> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/Icon',
  component: Icon,
  tags: ['autodocs'],
}

export default meta
export type IconStory = StoryObj<typeof Icon>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Play: IconStory = {
  args: {
    color: 'secondary',
    size: '4xl',
    icon: 'inbox',
  },
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'accent', 'onSurface'],
      control: { type: 'select' },
    },
    size: {
      options: [
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
      ],
      control: { type: 'select' },
    },
  },
  render: ({ color, icon, size }) => (
    <Icon color={color} icon={icon} size={size} />
  ),
}

export const ExampleOnSurface: SurfaceStory<IconProps> = {
  argTypes: {
    ...SurfaceStoryArgTypes,
    icon: { control: { type: 'select' as const } },
    color: { control: false },
    isShownOn: { control: false },
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
      <Icon icon={icon} size={size} color="onSurface" />
    </SurfaceForStory>
  ),
}
