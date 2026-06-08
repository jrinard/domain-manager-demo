import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconStoryWithLabel } from './ApprovedStories/helpers'

import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'DL: Falcon/Molecules/Icon/Approved',
  component: Icon,
  tags: ['autodocs'],
  args: {
    color: 'secondary',
    size: '2xl',
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
    color: {
      options: ['primary', 'secondary', 'accent', 'onSurface'],
      control: { type: 'select' },
    },
    size: {
      options: [
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'All known and approved icons from <a href="https://icon-sets.iconify.design/">Iconify</a>. Please note that we are only using Material Symbols and Material Design Icons (MDI)',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Folder: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="folder" color={color} size={size} />
  },
}

export const FolderOutline: Story = {
  render: ({ color, size }) => {
    return (
      <IconStoryWithLabel icon="folder-outline" color={color} size={size} />
    )
  },
}

export const FolderMove: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="folder-move" color={color} size={size} />
  },
}

export const Alert: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="alert" color={color} size={size} />
  },
}

export const AlertOutline: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="alert-outline" color={color} size={size} />
  },
}

export const Archive: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="archive" color={color} size={size} />
  },
}

export const ArchiveOutline: Story = {
  render: ({ color, size }) => {
    return (
      <IconStoryWithLabel icon="archive-outline" color={color} size={size} />
    )
  },
}

export const Bell: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="bell" color={color} size={size} />
  },
}

export const BellOutline: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="bell-outline" color={color} size={size} />
  },
}

export const Eye: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="eye" color={color} size={size} />
  },
}

export const Download: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="download" color={color} size={size} />
  },
}

export const DownloadOutline: Story = {
  render: ({ color, size }) => {
    return (
      <IconStoryWithLabel icon="download-outline" color={color} size={size} />
    )
  },
}

export const PencilOutline: Story = {
  render: ({ color, size }) => {
    return (
      <IconStoryWithLabel icon="pencil-outline" color={color} size={size} />
    )
  },
}

export const ChevronRight: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="chevron-right" color={color} size={size} />
  },
}

export const ChevronLeft: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="chevron-left" color={color} size={size} />
  },
}

export const Kebab: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Kebab is known by MDI as dots-vertical',
      },
    },
  },
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="dots-vertical" color={color} size={size} />
  },
}

export const Search: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="search" color={color} size={size} />
  },
}

export const Lock: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="lock" color={color} size={size} />
  },
}

export const InboxOutline: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="inbox-outline" color={color} size={size} />
  },
}

export const Send: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="send" color={color} size={size} />
  },
}

export const SendOutline: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="send-outline" color={color} size={size} />
  },
}

export const Reply: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="reply" color={color} size={size} />
  },
}

export const AccountStarCheck: Story = {
  render: ({ color, size }) => {
    return (
      <IconStoryWithLabel icon="account-star-check" color={color} size={size} />
    )
  },
}

export const Link: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="link" color={color} size={size} />
  },
}

export const MapOutline: Story = {
  render: ({ color, size }) => {
    return <IconStoryWithLabel icon="map-outline" color={color} size={size} />
  },
}

export const UnfoldMoreHorizontal: Story = {
  render: ({ color, size }) => {
    return (
      <IconStoryWithLabel
        icon="unfold-more-horizontal"
        color={color}
        size={size}
      />
    )
  },
}
