import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { PasswordInput } from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'DL: Falcon/Inputs/Password Input',
  component: PasswordInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PasswordInput>

export const PasswordHidden: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Use case explanation',
      },
    },
  },
  render: ({ ...props }) => <PasswordInput {...props} />,
}
