import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import TDM from '../../../tests/tdm'
import { Heatmap } from './Heatmap'

const meta: Meta<typeof Heatmap> = {
  title: 'Dossier/Molecules/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Heatmap>

export const StandardHeatMap: Story = {
  args: {
    discValues: Array.from({ length: 10 }, () =>
      TDM.createDiscGraphExtendedValues(),
    ),
    heatMapType: 'public',
  },
  parameters: {
    docs: {
      description: {
        story: 'Places Dots for Each Team Member',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/iGv01sqV2FdS7RSBzP1MCQ/UI-Design-Library?type=design&amp;node-id=4490-4676&amp;mode=design&amp;t=BMgVqyVDBHKV7g5J-4',
    },
  },
  render: ({ ...props }) => <Heatmap {...props} />,
}

export const TinyHeatMap: Story = {
  args: {
    discValues: Array.from({ length: 10 }, () =>
      TDM.createDiscGraphExtendedValues(),
    ),
    heatMapType: 'public',
    heatMapWidth: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Places Dots for Each Team Member',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/iGv01sqV2FdS7RSBzP1MCQ/UI-Design-Library?type=design&amp;node-id=4490-4676&amp;mode=design&amp;t=BMgVqyVDBHKV7g5J-4',
    },
  },
  render: ({ ...props }) => <Heatmap {...props} />,
}

export const GiantHeatMap: Story = {
  args: {
    discValues: Array.from({ length: 10 }, () =>
      TDM.createDiscGraphExtendedValues(),
    ),
    heatMapType: 'public',
    heatMapWidth: 1_000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Places Dots for Each Team Member',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/iGv01sqV2FdS7RSBzP1MCQ/UI-Design-Library?type=design&amp;node-id=4490-4676&amp;mode=design&amp;t=BMgVqyVDBHKV7g5J-4',
    },
  },
  render: ({ ...props }) => <Heatmap {...props} />,
}

export const EmptyHeatMap: Story = {
  args: {
    discValues: [],
    heatMapType: 'public',
  },
  parameters: {
    docs: {
      description: {
        story: 'Places Dots for Each Team Member',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/iGv01sqV2FdS7RSBzP1MCQ/UI-Design-Library?type=design&amp;node-id=4490-4676&amp;mode=design&amp;t=BMgVqyVDBHKV7g5J-4',
    },
  },
  render: ({ ...props }) => <Heatmap {...props} />,
}

export const NoLabels: Story = {
  args: {
    discValues: Array.from({ length: 10 }, () =>
      TDM.createDiscGraphExtendedValues(),
    ),
    heatMapType: 'public',
    omitLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Places Dots for Each Team Member',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/iGv01sqV2FdS7RSBzP1MCQ/UI-Design-Library?type=design&amp;node-id=4490-4676&amp;mode=design&amp;t=BMgVqyVDBHKV7g5J-4',
    },
  },
  render: ({ ...props }) => <Heatmap {...props} />,
}
