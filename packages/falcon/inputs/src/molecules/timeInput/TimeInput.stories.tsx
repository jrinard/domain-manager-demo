import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TimeInput } from './TimeInput'

const meta: Meta<typeof TimeInput> = {
  title: 'DL: Falcon/Inputs/Time Input',
  component: TimeInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TimeInput>

export const Unpassed: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'When nothing is passed to time input',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <TimeInput {...props} />,
}

export const Passed: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'When a value is passed to time input',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <TimeInput {...props} value="12:00" />,
}

export const Step: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Step set to 15 minute increments. The `step` attribute is a number that specifies the granularity that the value must adhere to, or the special value any, which is described below. Only values which are equal to the basis for stepping (min if specified, value otherwise, and an appropriate default value if neither of those is provided) are valid. A string value of any means that no stepping is implied, and any value is allowed (barring other constraints, such as min and max).',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <TimeInput {...props} step="900" />,
}
