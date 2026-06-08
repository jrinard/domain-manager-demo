import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BAR3Quadrants } from './BAR3Quadrants'
import { MemoryRouter } from 'react-router-dom'
import { DiscProfilesMiniEndpointResponses } from '@tyto/lore'

const meta: Meta<typeof BAR3Quadrants> = {
  title: 'Domain UI/Organisms/BAR3Quadrants',
  component: BAR3Quadrants,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BAR3Quadrants>

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
      <BAR3Quadrants
        {...props}
        // @ts-expect-error mismatch, but not important and not worth altering types or preexisting data
        discProfile={
          DiscProfilesMiniEndpointResponses.get.success().discProfiles[0]
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
      <BAR3Quadrants {...props} isLoading />
    </MemoryRouter>
  ),
}
