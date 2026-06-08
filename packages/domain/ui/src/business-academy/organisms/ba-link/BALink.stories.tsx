import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BaLink } from './BALink'
import { MemoryRouter } from 'react-router-dom'

const meta: Meta<typeof BaLink> = {
  title: 'Domain UI/Organisms/BA Link',
  component: BaLink,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BaLink>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <MemoryRouter>
      <BaLink {...props} title="Training" />
    </MemoryRouter>
  ),
}
