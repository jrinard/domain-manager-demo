import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard'
import { Button } from '../button/Button'
import { Avatar } from '../avatar/Avatar'

const meta: Meta<typeof HoverCard> = {
  title: 'DL: Falcon/Molecules/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Bare: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Description',
      },
    },
  },
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button color="ghost">Next</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar name="Veln Yema" src="https://github.com/vercel.png" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-muted-foreground text-xs">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
