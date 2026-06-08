import { expect } from 'storybook/test'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ToggleGroup } from './ToggleGroup'

const meta: Meta<typeof ToggleGroup> = {
  title: 'DL: Falcon/Molecules/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'changed' } },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Populated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Populated list of toggle buttons',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <ToggleGroup
      {...props}
      options={[
        { value: 'weekly', label: 'This week' },
        { value: 'monthly', label: 'This month' },
        { value: 'yearly', label: 'This year' },
        { value: 'custom', label: 'Custom' },
        // ...as many options as needed
      ]}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('This week'))
    await userEvent.click(canvas.getByLabelText('This year'))
    await expect(canvas.getByLabelText('This week').ariaChecked).toEqual(
      'false',
    )
    await expect(canvas.getByLabelText('This year').ariaChecked).toEqual('true')
  },
}

export const NoOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'No options provided (empty list)',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <ToggleGroup {...props} options={[]} />,
}
