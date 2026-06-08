import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextLabel } from './TextLabel'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'
import { TextSubHeadingProps } from '../textSubHeading/TextSubHeading'

const meta: Meta<typeof TextLabel> = {
  title: 'DL: Falcon/Atoms/Text Label',

  component: TextLabel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextLabel>

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Text "Label" style from the CV Design Library',
      },
    },
  },
  render: (props) => <TextLabel {...props}>Label</TextLabel>,
}

export const ExampleOnSurface: SurfaceStory<TextSubHeadingProps> = {
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
        story: 'Example of a TextLabel being on a surface ',
      },
    },
  },
  render: ({ onSurface }) => (
    <SurfaceForStory surface={onSurface}>
      <TextLabel>Text Label</TextLabel>
    </SurfaceForStory>
  ),
}
