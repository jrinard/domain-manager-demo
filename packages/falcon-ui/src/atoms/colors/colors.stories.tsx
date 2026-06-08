import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { ColorSwatch } from '@falcon/storybook'

const meta: Meta<typeof HTMLDivElement> = {
  title: 'DL: Falcon/Atoms/Colors',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return <div className="flex flex-col gap-2">{Story()}</div>
    },
  ],
}

export default meta
type Story = StoryObj<typeof HTMLDivElement>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const All: Story = {
  render: () => {
    return (
      <>
        <div className="pb-6">
          <div className="text-primary dark:text-secondary">Theme</div>
          <hr className="w-full border border-slate-200" />
        </div>
        <div className="flex flex-row flex-wrap gap-10">
          <ColorSwatch color="primary" description="" />
          <ColorSwatch color="primary-foreground" description="" />
          <ColorSwatch
            color="primary-isSelected"
            description="Usually for lists"
          />
          <ColorSwatch color="primary-new" description="Usually for lists" />
          <ColorSwatch color="secondary" description="" />
          <ColorSwatch color="secondary-foreground" description="" />
          <ColorSwatch color="accent" description="" />
          <ColorSwatch color="accent-foreground" description="" />
          <ColorSwatch color="muted" description="" />
          <ColorSwatch color="muted-foreground" description="" />
          <ColorSwatch color="ring" description="on focus" />
        </div>

        <div className="py-6">
          <div className="text-primary dark:text-secondary">
            Constants (e.g. Status)
          </div>
          <hr className="w-full border border-slate-200" />
        </div>
        <div className="flex flex-row flex-wrap gap-10">
          <ColorSwatch color="info" description="Status" />
          <ColorSwatch color="success" description="Status" />
          <ColorSwatch color="error" description="Status" />
          <ColorSwatch color="warn" description="Status" />
          <ColorSwatch color="future" description="Status" />
        </div>
      </>
    )
  },
}

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Theme color **primary**',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="primary" description="" />
        <ColorSwatch
          color="primary-foreground"
          description="Typically used for Text color on primary"
        />
      </div>
    )
  },
}

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Theme color **secondary**',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="secondary" description="" />
        <ColorSwatch
          color="primary-secondary"
          description="Typically used for Text color on secondary"
        />
      </div>
    )
  },
}

export const Accent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Theme color **accent**',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="accent" description="" />
        <ColorSwatch
          color="accent-secondary"
          description="Typically used for Text color on accent"
        />
      </div>
    )
  },
}

export const Muted: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Theme color **muted**',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="muted" description="" />
        <ColorSwatch
          color="muted-secondary"
          description="Typically used for Text color on muted"
        />
      </div>
    )
  },
}

export const Ring: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Theme color **ring**. Used when something is focused. e.g. _The focus indicator for Inputs and Buttons_',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="ring" description="" />
        <ColorSwatch
          color="ring-secondary"
          description="Typically used for Text color on ring"
        />
      </div>
    )
  },
}

export const Info: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status color **info**.',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="info" description="" />
      </div>
    )
  },
}

export const Warn: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status color **warn**.',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="warn" description="" />
      </div>
    )
  },
}

export const Success: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status color **success**.',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="success" description="" />
      </div>
    )
  },
}

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status color **error**.',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="error" description="" />
      </div>
    )
  },
}

export const Future: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status color **future**.',
      },
    },
  },
  render: () => {
    return (
      <div className="flex flex-wrap gap-10">
        <ColorSwatch color="future" description="" />
      </div>
    )
  },
}
