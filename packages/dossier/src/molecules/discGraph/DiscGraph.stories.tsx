import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DiscGraph } from './DiscGraph'
import TDM from '../../../tests/tdm'

const meta: Meta<typeof DiscGraph> = {
  title: 'Dossier/Molecules/Disc Image',
  component: DiscGraph,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DiscGraph>

export const AssessmentComplete: Story = {
  args: {
    graphNumber: '2',
    size: 150,
    graphValues: TDM.createDiscGraphValues(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Graph Number determines the Public (1), Private (2) display of scores',
      },
    },
  },
  render: ({ graphNumber, size, graphValues }) => (
    <DiscGraph
      isLoading={false}
      graphNumber={graphNumber}
      graphValues={graphValues}
      size={size}
    />
  ),
}

export const IsLoading: Story = {
  args: {
    isLoading: true,
    graphNumber: '2',
    size: 150,
    graphValues: TDM.createDiscGraphValues(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Is loading the data',
      },
    },
  },
  render: ({ isLoading, graphNumber, size, graphValues }) => (
    <DiscGraph
      isLoading={isLoading}
      graphNumber={graphNumber}
      graphValues={graphValues}
      size={size}
    />
  ),
}

export const AssessmentIncomplete: Story = {
  args: {
    isLoading: false,
    graphNumber: '2',
    size: 150,
    graphValues: TDM.createDiscGraphValues({
      styleKey3: '',
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disc Assessment has not been completed',
      },
    },
  },
  render: ({ isLoading, graphNumber, size, graphValues }) => (
    <DiscGraph
      isLoading={isLoading}
      graphNumber={graphNumber}
      graphValues={graphValues}
      size={size}
    />
  ),
}
