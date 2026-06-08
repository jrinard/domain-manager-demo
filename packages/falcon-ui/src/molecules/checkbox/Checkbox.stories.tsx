import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/Checkbox',
  component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>

export const ColorSecondary: Story = {
  render: (props) => <Checkbox {...props} color="secondary" />,
}

export const ColorPrimary: Story = {
  render: (props) => <Checkbox {...props} color="primary" />,
}

export const CheckedTrue: Story = {
  render: (props) => <Checkbox {...props} color="secondary" checked />,
}

export const CheckedFalse: Story = {
  render: (props) => <Checkbox {...props} />,
}

export const Indeterminate: Story = {
  render: (props) => (
    <Checkbox {...props} color="secondary" checked="indeterminate" />
  ),
}

export const Disabled: Story = {
  render: (props) => <Checkbox {...props} color="secondary" disabled checked />,
}
