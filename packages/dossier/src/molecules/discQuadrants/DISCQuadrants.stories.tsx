import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { DISCQuadrants } from './DISCQuadrants'
import TDM from '../../../tests/tdm'

const meta: Meta<typeof DISCQuadrants> = {
  title: 'Dossier/Molecules/DISC Quadrants',

  component: DISCQuadrants,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DISCQuadrants>

export const StandardRender: Story = {
  args: {
    discValues: TDM.createDiscGraphValues(),
    size: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders Graph, given Values.',
      },
    },
  },
  render: (props) => (
    <div style={{ height: '400px', width: '400px' }}>
      <DISCQuadrants {...props} />
    </div>
  ),
}

export const PublicGraphRender: Story = {
  args: {
    graph: 'Public',
    size: 400,
    discValues: TDM.createDiscGraphValues(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders Graph, given Values and Public Flag.',
      },
    },
  },
  render: (props) => (
    <div style={{ height: '400px', width: '400px' }}>
      <DISCQuadrants {...props} />
    </div>
  ),
}

export const PrivateGraphRender: Story = {
  args: {
    graph: 'Private',
    discValues: TDM.createDiscGraphValues(),
    size: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders Graph, given Values and Private Flag.',
      },
    },
  },
  render: (props) => (
    <div style={{ height: '400px', width: '400px' }}>
      <DISCQuadrants {...props} />
    </div>
  ),
}
