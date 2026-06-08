import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextAreaInput } from './TextAreaInput'

const meta: Meta<typeof TextAreaInput> = {
  title: 'DL: Falcon/Inputs/Text Area Input',
  component: TextAreaInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextAreaInput>

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
  render: () => <TextAreaInput />,
}

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With a placeholder',
      },
    },
  },
  render: () => <TextAreaInput placeholder="Long message to a coworker" />,
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => <TextAreaInput value="disabled content" disabled />,
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
  render: (props) => <TextAreaInput {...props} />,
}
