import { within, userEvent } from '@storybook/test'
import { act } from '@testing-library/react'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { NumberInput } from './NumberInput'

const meta: Meta<typeof NumberInput> = {
  title: 'DL: Falcon/Molecules/Inputs/Number Input',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { control: { action: 'onChange' } },
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const ValueWithinRange: Story = {
  args: {
    value: 10,
    step: 5,
    max: 1000,
    min: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Value is set within the defined range',
      },
    },
  },
  render: ({ value, step, max, min, ...props }) => (
    <NumberInput {...props} value={value} step={step} max={max} min={min} />
  ),
}

export const ValueOutsideRange: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Value (1000) being passed outside of give range (1-100). _Currently, there is no error indicators_',
      },
    },
  },
  render: ({ ...props }) => (
    <NumberInput {...props} value={1000} max={100} min={1} />
  ),
}

export const StepNotSet: Story = {
  args: {
    value: 10,
    max: 1000,
    min: 0,
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story:
          'Behavior of when we do not want any incremental/decremental steps (use arrows)',
      },
    },
  },
  render: ({ value, step, max, min, ...props }) => (
    <NumberInput {...props} value={value} step={step} max={max} min={min} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('number-input-increment')
    await act(async () => {
      await userEvent.click(input)
    })
  },
}
