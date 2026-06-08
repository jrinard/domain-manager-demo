import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextBody } from '../../atoms/textBody/TextBody'

import { Surface } from './Surface'

const meta: Meta<typeof Surface> = {
  title: 'DL: Falcon/Molecules/Surface',
  component: Surface,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Surface>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const Dark: Story = {
  args: {
    light: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark Surface',
      },
    },
  },
  render: (props) => (
    <Surface className="size-full" {...props}>
      <TextBody>I am on something dark</TextBody>
    </Surface>
  ),
}

export const Light: Story = {
  args: {
    light: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Light Surface',
      },
    },
  },
  render: (props) => (
    <Surface className="size-full min-h-52" {...props}>
      <TextBody>I am on something light</TextBody>
    </Surface>
  ),
}
