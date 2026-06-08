import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'DL: Falcon/Molecules/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const Vertical: Story = {
  args: {},
  parameters: {},
  render: (props) => (
    <RadioGroup
      {...props}
      direction="col"
      defaultValue="1"
      options={[
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
      ]}
    />
  ),
}

export const Horizontal: Story = {
  args: {},
  parameters: {},
  render: (props) => (
    <RadioGroup
      {...props}
      direction="row"
      defaultValue="1"
      options={[
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
      ]}
    />
  ),
}

export const Disabled: Story = {
  args: {},
  parameters: {},
  render: (props) => (
    <RadioGroup
      {...props}
      disabled
      direction="col"
      defaultValue="1"
      options={[
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
      ]}
    />
  ),
}
