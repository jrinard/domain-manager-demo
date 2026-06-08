import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BAStyleKey } from './BAStyleKey'

const meta: Meta<typeof BAStyleKey> = {
  title: 'Domain Ui/Organisms/BA Style Key',
  component: BAStyleKey,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BAStyleKey>

export const Deafult: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BAStyleKey {...props} styleKey="DISC" />,
}
