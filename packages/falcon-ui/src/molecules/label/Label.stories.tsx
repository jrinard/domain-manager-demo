import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../checkbox/Checkbox'

import { Label, LabelProps } from './Label'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof Label> = {
  title: 'DL: Falcon/Molecules/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['auto', 'primary', 'secondary'],
      control: 'select',
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Color: Story = {
  args: {
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color specific setting. _Default is auto based on surface_',
      },
    },
  },
  render: ({ color, textType }) => (
    <Label color={color} textType={textType}>
      Label
    </Label>
  ),
}

export const BodyStyle: Story = {
  args: {
    color: 'secondary',
    textType: 'body',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label using body text instead of bolded uppercase text',
      },
    },
  },
  render: ({ color, textType }) => (
    <Label color={color} textType={textType}>
      Label
    </Label>
  ),
}

export const NavigationStyle: Story = {
  args: {
    color: 'secondary',
    textType: 'navigation',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label using navigation text instead of bolded uppercase text',
      },
    },
  },
  render: ({ color, textType }) => (
    <Label color={color} textType={textType}>
      Label
    </Label>
  ),
}

export const ExampleOnSurface: SurfaceStory<LabelProps> = {
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
        story: 'Example of a Label being on a surface ',
      },
    },
  },
  render: ({ onSurface }) => (
    <SurfaceForStory surface={onSurface}>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" color="onSurface" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </SurfaceForStory>
  ),
}
