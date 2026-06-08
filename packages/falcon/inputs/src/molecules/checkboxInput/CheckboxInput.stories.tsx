import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxInput } from './CheckboxInput'

const meta: Meta<typeof CheckboxInput> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Inputs/Checkbox Input',
  component: CheckboxInput,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: [
        'onSurface',
        'primary',
        'secondary',
        'info',
        'success',
        'warn',
        'error',
        'accent',
      ],
      control: 'select',
    },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxInput>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Color: Story = {
  args: {
    color: 'secondary',
  },
  render: (props) => <CheckboxInput {...props} />,
}

export const CheckedTrue: Story = {
  render: (props) => <CheckboxInput color="secondary" checked {...props} />,
}

export const CheckedFalse: Story = {
  render: (props) => <CheckboxInput {...props} />,
}

export const Indeterminate: Story = {
  render: (props) => (
    <CheckboxInput color="secondary" checked="indeterminate" {...props} />
  ),
}

export const Label: Story = {
  render: (props) => (
    <CheckboxInput
      color="secondary"
      checked
      label="Accept user agreements"
      {...props}
    />
  ),
}
