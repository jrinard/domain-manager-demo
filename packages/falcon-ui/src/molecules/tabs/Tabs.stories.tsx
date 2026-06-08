import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from '@holodeck/router'

import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'DL: Falcon/Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [withRouter()],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Buttons: Story = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: 'Tabs as buttons',
      },
    },
  },
  render: ({ items, ariaLabelBy, ...props }) => (
    <Tabs
      items={[
        {
          id: 1,
          label: 'Item 1',
        },
        {
          id: 2,
          label: 'Item 2',
          disabled: true,
        },
        {
          id: 3,
          label: 'Item 3',
        },
      ]}
      ariaLabelBy="navigation"
      {...props}
    />
  ),
}

export const Links: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs as links',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: () => (
    <Tabs
      items={[
        {
          id: 1,
          label: 'Item 1',
          to: '#item-1',
        },
        {
          id: 2,
          label: 'Item 2',
          to: '#item-2',
          disabled: true,
        },
        {
          id: 3,
          label: 'Item 3',
          to: '#item-3',
        },
      ]}
      ariaLabelBy="navigation"
    />
  ),
}

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs selected (and mixed buttons and links)',
      },
    },
  },
  render: ({ onSelect, selected }) => (
    <Tabs
      items={[
        {
          id: 1,
          label: 'Item 1',
        },
        {
          id: 2,
          label: 'Item 2',
          to: '#item-2',
        },
        {
          id: 3,
          label: 'Item 3',
        },
      ]}
      selected={selected || 3}
      onSelect={onSelect}
      ariaLabelBy="navigation"
    />
  ),
}

export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'No tabs provided',
      },
    },
  },
  render: () => <Tabs items={[]} ariaLabelBy="navigation" />,
}
