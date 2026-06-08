import { IconButton } from '../iconButton/IconButton'
import {
  CollapsibleContent,
  Collapsible,
  CollapsibleTrigger,
} from './Collapsible'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Collapsible> = {
  title: 'DL: Falcon/Molecules/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Collapsed: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The default is for the component to be collapsed. _The code is uncontrolled usage. `open` with `onOpenChange` can be used for a controlled usage._',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <Collapsible className="w-1/2 space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <IconButton icon="unfold-more-horizontal" />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const CollapsedTriggerBelow: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Collapsed trigger is below the content',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <Collapsible className="w-1/2 space-y-2">
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <IconButton icon="unfold-more-horizontal" />
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  ),
}
