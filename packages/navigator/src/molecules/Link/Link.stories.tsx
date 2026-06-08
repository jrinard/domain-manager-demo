import { withRouter } from '@holodeck/router'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Navigator/Molecules/Link',
  component: Link,
  tags: ['autodocs'],
  decorators: [withRouter()],
}

export default meta
type Story = StoryObj<typeof Link>

export const AnotherTryybApp: Story = {
  args: {
    app: 'mytraining',
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: 'Link to another Tryyb App',
      },
    },
  },
  render: ({ app }) => {
    return (
      <Link to="123" app={app}>
        Link to another app
      </Link>
    )
  },
}

export const Regular: Story = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: 'Regular link; not to another app',
      },
    },
  },
  render: () => {
    return <Link to="www.cardoneventures.com">Link to another app</Link>
  },
}
