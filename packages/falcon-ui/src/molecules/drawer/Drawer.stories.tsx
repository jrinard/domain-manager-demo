import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'DL: Falcon/Molecules/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default drawer with trigger and close',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Open Drawer
        </button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Drawer Content</h2>
          <p>This is inside the Drawer</p>
          <DrawerClose asChild>
            <button className="rounded bg-gray-200 px-3 py-2">Close</button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}
