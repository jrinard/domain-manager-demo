import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BAR3 } from './BAR3'
import { MemoryRouter } from 'react-router-dom'
import { DiscProfilesMiniEndpointResponses } from '@tyto/lore'

const meta: Meta<typeof BAR3> = {
  title: 'Domain UI/Organisms/BAR3',
  component: BAR3,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BAR3>

export const Deafult: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Loaded with data',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <MemoryRouter>
      <BAR3
        {...props}
        // @ts-expect-error mismatch, but not important and not worth altering types or preexisting data
        discProfiles={
          DiscProfilesMiniEndpointResponses.get.success().discProfiles
        }
        teamName="Small Earthen Pot LLC"
      />
    </MemoryRouter>
  ),
}

export const IsLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the data is loading',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <MemoryRouter>
      <BAR3 {...props} isLoading discProfiles={[]} />
    </MemoryRouter>
  ),
}
