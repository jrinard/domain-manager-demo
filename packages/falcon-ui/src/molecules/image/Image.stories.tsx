import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import { Image } from './Image'

const meta: Meta<typeof Image> = {
  title: 'DL: Falcon/Molecules/Image',
  component: Image,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Image>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Loading an image',
      },
      source: {
        code: 'Disabled for this story, see https://github.com/storybookjs/storybook/issues/11554',
      },
    },
    msw: {
      handlers: [
        rest.get('*infinite-loading.jpg', async (_, res, ctx) => {
          return res(ctx.delay('infinite'), ctx.status(200))
        }),
      ],
    },
  },
  render: (props) => <Image {...props} src="/infinite-loading.jpg" alt="" />,
}

export const NotFound: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image is not found',
      },
    },
    msw: {
      handlers: [
        rest.get('*/not-found', async (_, res, ctx) => {
          return res(ctx.status(404))
        }),
      ],
    },
  },
  render: (props) => <Image {...props} src="/images/not-found" alt="" />,
}

export const Found: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Image is available',
      },
    },
    msw: {
      handlers: [
        rest.get('*/34839857.jpg', async (_, res, ctx) => {
          const imageBuffer = await fetch(
            'https://fastly.picsum.photos/id/980/200/200.jpg?hmac=6XJlc3jZzO4_ikuKGQFXIuERlW0eZx82q3xiC-b3Tso'
          ).then((res) => res.arrayBuffer())
          return res(
            ctx.set('Content-Length', imageBuffer.byteLength.toString()),
            ctx.set('Content-Type', 'image/jpeg'),
            ctx.body(imageBuffer)
          )
        }),
      ],
    },
  },
  render: (props) => <Image {...props} src="/images/34839857.jpg" alt="" />,
}
