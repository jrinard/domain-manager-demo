import { Button } from '@falcon/buttons'
import { Input } from '@falcon/input'
import { Label } from '@spacedock/falcon-ui'
import { userEvent, within } from '@storybook/test'
import { act } from '@testing-library/react'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet'

const meta: Meta<typeof Sheet> = {
  title: 'DL: Falcon/Molecules/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const RightSide: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When we want the sheet to come from the right side',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button data-testid="open-button">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label textType="body" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label textType="body" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('open-button')
    await act(async () => {
      await userEvent.click(input)
    })
  },
}

export const LeftSide: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When we want the sheet to come from the right side',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button data-testid="open-button">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label textType="body" htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label textType="body" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('open-button')
    await act(async () => {
      await userEvent.click(input)
    })
  },
}
