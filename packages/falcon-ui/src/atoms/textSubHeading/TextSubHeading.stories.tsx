import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextSubHeading, TextSubHeadingProps } from './TextSubHeading'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof TextSubHeading> = {
  title: 'DL: Falcon/Atoms/Text Sub Heading',
  component: TextSubHeading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextSubHeading>

export const SubHeading: Story = {
  render: (props) => <TextSubHeading {...props}>Sub Heading</TextSubHeading>,
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
        story: 'Example of a TextSubHeading being on a surface ',
      },
    },
  },
  render: ({ onSurface }) => (
    <SurfaceForStory surface={onSurface}>
      <TextSubHeading>Sub Heading on Surface</TextSubHeading>
    </SurfaceForStory>
  ),
}
