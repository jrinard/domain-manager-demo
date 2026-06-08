import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ImagesPage } from './ImagesPage'

const meta: Meta<typeof ImagesPage> = {
  title: 'App: DomainManager/Pages/Images Page',
  component: ImagesPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ImagesPage>

export const Present: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Images page with content loaded.',
      },
    },
  },
  render: ({ ...props }) => (
    <div className="h-screen bg-black">
      <ImagesPage domainID={123} {...props} />
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Images page in loading state.',
      },
    },
  },
  render: ({ ...props }) => (
    <div className="h-screen bg-black">
      <ImagesPage domainID={123} {...props} />
    </div>
  ),
}
