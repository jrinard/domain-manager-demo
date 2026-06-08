import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/Button'
import { Label } from '../label/Label'
import { TextInput } from '../inputs/textInput/TextInput'

import { Popover, PopoverTrigger, PopoverContent } from './Popover'
import { noop } from 'lodash'

const meta: Meta<typeof Popover> = {
  title: 'DL: Falcon/Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const CloseOnXOnly: Story = {
  args: {
    modal: true,
  },
  parameters: {},
  render: (props) => (
    <Popover modal={props.modal}>
      <PopoverTrigger asChild>
        <Button variant="primary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        headerText="Dimensions"
        action={<Button>Apply</Button>}
      >
        <div className="grid gap-4 ">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <TextInput id="width" defaultValue="100%" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <TextInput id="maxWidth" defaultValue="300px" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <TextInput id="height" defaultValue="25px" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <TextInput id="maxHeight" defaultValue="none" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const CloseOnUnfocus: Story = {
  args: {},
  parameters: {},
  render: (props) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        headerText="Dimensions"
        action={<Button>Apply</Button>}
        onInteractOutside={noop}
      >
        <div className="grid gap-4 ">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <TextInput id="width" defaultValue="100%" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <TextInput id="maxWidth" defaultValue="300px" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <TextInput id="height" defaultValue="25px" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <TextInput id="maxHeight" defaultValue="none" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const HideHeader: Story = {
  args: {},
  parameters: {},
  render: (props) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent hideHeader>
        <div className="grid gap-4 ">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <TextInput id="width" defaultValue="100%" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <TextInput id="maxWidth" defaultValue="300px" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <TextInput id="height" defaultValue="25px" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <TextInput id="maxHeight" defaultValue="none" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
