import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextHeading } from './TextHeading'

const meta: Meta<typeof TextHeading> = {
  title: 'DL: Falcon/Atoms/Text Heading',
  component: TextHeading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextHeading>

export const Header1: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => (
    <TextHeading {...props} size={1}>
      Heading 1
    </TextHeading>
  ),
}

export const Header2: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => (
    <TextHeading {...props} size={2}>
      Heading 2
    </TextHeading>
  ),
}

export const Header3: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => (
    <p>
      <TextHeading {...props} size={3}>
        Heading 3
      </TextHeading>
    </p>
  ),
}
