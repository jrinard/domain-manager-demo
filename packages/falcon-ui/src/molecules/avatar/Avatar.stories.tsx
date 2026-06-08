import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { random } from 'lodash'
import { faker } from '@faker-js/faker/locale/en'

import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const ImageLoads: Story = {
  args: {
    src: `https://i.pravatar.cc/?img=${random(1, 40)}`,
    name: faker.person.fullName(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar with image loading and name set (both are required properties). Size is an optional field and the displayed is the default size.',
      },
    },
  },
  render: ({ size, src, name }) => <Avatar src={src} name={name} size={size} />,
}

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'What happens if the image fails to load; it falls back to the name initials',
      },
    },
  },
  args: {
    name: faker.person.fullName(),
    stroked: false,
  },
  render: ({ name, stroked }) => (
    <Avatar
      src="https://images.unsplash.com/photo-1492633423870-43d1cd277"
      name={name}
      stroked={stroked}
    />
  ),
}

export const Stroked: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This property should only be enabled when an avatar is in a group (AvatarGroup)',
      },
    },
  },
  args: {
    src: `https://i.pravatar.cc/?img=${random(1, 40)}`,
    name: faker.person.fullName(),
    stroked: false,
  },
  render: ({ name, src, stroked }) => (
    <Avatar stroked={stroked} src={src} name={name} />
  ),
}
