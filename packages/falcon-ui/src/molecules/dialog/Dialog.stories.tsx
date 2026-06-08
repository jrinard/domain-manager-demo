import { Icon } from '@falcon/icons'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/Button'
import { IconButton } from '../iconButton/IconButton'
import { TextInput } from '../inputs/textInput/TextInput'

import { Dialog, DialogProps, DialogTrigger } from './Dialog'

const meta: Meta<typeof Dialog> = {
  title: 'DL: Falcon/Molecules/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

const StorybookWrappedDialog = (props: DialogProps) => {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open the Modal</Button>
      <Dialog {...props} open={open} onOpenChange={setOpen} />
    </div>
  )
}

export const Title: Story = {
  args: {
    open: false,
    title: 'This is a Title',
  },
  parameters: {
    docs: {
      description: {
        story: 'Just the title',
      },
    },
  },
  render: (props) => <StorybookWrappedDialog {...props} />,
}

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Actions are the buttons in the bottom of the Dialog',
      },
    },
  },
  render: (props) => (
    <Dialog title="Confirm" completeLabel="Yes">
      <DialogTrigger>Open</DialogTrigger>
      Are you sure?
    </Dialog>
  ),
}

export const CloseButtonLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default "Cancel" label for the default close button can be configured. (default: "Cancel")',
      },
    },
  },
  render: (props) => (
    <Dialog title="Do somthing" closeLabel="Close">
      <DialogTrigger>Open</DialogTrigger>
      <TextInput placeholder="Something" />
    </Dialog>
  ),
}

export const ExampleConfirmDelete: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of Confirmation Dialog',
      },
    },
  },
  render: () => (
    <Dialog title="Actions Are Good" destructiveLabel="Delete">
      <DialogTrigger>
        <IconButton icon="delete-outline" />
      </DialogTrigger>
      <div className="flex items-center gap-2.5 py-1">
        <Icon icon="error-outline" size="4xl" color="error" />
        <span>Are you sure you would like to delete this message?</span>
      </div>
    </Dialog>
  ),
}

export const ExampleCompleteLabelButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of completeLabel button',
      },
    },
  },
  render: () => (
    <Dialog title="Save Changes" completeLabel="Yes">
      <DialogTrigger>Save</DialogTrigger>
      Are you sure you wish to save changes?
    </Dialog>
  ),
}

export const ExampleDestructtiveLabelButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of destructiveLabel button',
      },
    },
  },
  render: () => (
    <Dialog title="Delete File" destructiveLabel="Yes">
      <DialogTrigger>Delete</DialogTrigger>
      Are you sure you wish to delete this file?
    </Dialog>
  ),
}
