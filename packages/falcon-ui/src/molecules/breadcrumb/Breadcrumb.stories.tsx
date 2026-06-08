import { withRouter } from '@holodeck/router'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'DL: Falcon/Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [withRouter()],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const BreadcrumbAsButton: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Example of buttons used in Breadcrumb',
      },
    },
  },
  render: ({ items, ...props }) => (
    <Breadcrumb
      items={[
        { label: '551', id: '551' },
        { label: 'CV', id: '1825957' },
      ]}
      {...props}
    />
  ),
}

export const BreadcrumbAsLink: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Example ofz  link used in Breadcrumb',
      },
    },
  },
  render: ({ items, ...props }) => (
    <Breadcrumb
      items={[
        {
          label: '551',
          id: '551',
          to: '#1825957',
        },
        {
          label: 'CV',
          id: '1825957',
          to: '#1825957',
        },
      ]}
      {...props}
    />
  ),
}
