import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './Carousel'

const meta: Meta<typeof Carousel> = {
  title: 'DL: Falcon/Molecules/Carousel',
  component: Carousel,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Horizontal: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Variable size',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <div className="w-full px-10">
      <Carousel
        carouselItems={[
          <div
            key="1"
            className="h-40 w-full rounded border border-white"
          ></div>,
          <div
            key="2"
            className="h-40 w-full rounded border border-white"
          ></div>,
          <div
            key="3"
            className="h-40 w-full rounded border border-white"
          ></div>,
          <div
            key="4"
            className="h-40 w-full rounded border border-white"
          ></div>,
          <div
            key="5"
            className="h-40 w-full rounded border border-white"
          ></div>,
        ]}
      />
    </div>
  ),
}
