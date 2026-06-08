import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextArea, TextAreaProps } from './TextArea'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof TextArea> = {
  title: 'DL: Falcon/Molecules/Inputs/Text Area',
  component: TextArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextArea>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const Bare: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Nothing provided',
      },
    },
  },
  render: () => <TextArea />,
}

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With a `label`',
      },
    },
  },
  render: () => (
    <TextArea placeholder="Long message to a coworker" label="Message" />
  ),
}

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With a placeholder',
      },
    },
  },
  render: () => <TextArea placeholder="Long message to a coworker" />,
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => <TextArea value="disabled content" disabled />,
}

export const OnChangeStopped: Story = {
  argTypes: { onChangeStopped: { action: 'onChangeStopped' } },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => <TextArea {...props} />,
}

export const ExampleOnSurface: SurfaceStory<TextAreaProps> = {
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
        story: 'Example of a TextArea being on a surface ',
      },
    },
  },
  render: ({ onSurface }) => (
    <SurfaceForStory surface={onSurface}>
      <TextArea />
    </SurfaceForStory>
  ),
}
