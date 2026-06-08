import type { Meta, StoryObj } from '@storybook/react'

import { ImageCard } from './ImageCard'

const meta: Meta<typeof ImageCard> = {
  title: 'App: DomainManager/Organisms/Image Card',
  component: ImageCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ImageCard>

export const Present: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image card with image, title, description, and action buttons.',
      },
    },
  },
  render: ({ ...props }) => (
    <div className="w-64">
      <ImageCard
        title="Main Logo"
        description="Recommended Size: 1920x1080"
        imageUrl="/demo-assets/logos/logo-light.png"
        variety="dark"
        {...props}
      />
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image card with no image - shows upload button only.',
      },
    },
  },
  render: ({ ...props }) => (
    <div className="w-64">
      <ImageCard
        title="Login Logo"
        description="Recommended Size: 1920x1080"
        variety="light"
        {...props}
      />
    </div>
  ),
}
