import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  DomainManagerConfigDialog,
  DomainManagerConfigDialogProps,
} from './DomainManagerConfigDialog'
import {} from 'storybook/test'
const meta: Meta<typeof DomainManagerConfigDialog> = {
  title: 'App: DomainManager/Organisms/Domain Manager Config Dialog',
  component: DomainManagerConfigDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DomainManagerConfigDialog>

const DomainManagerConfigDialogExample = (
  props: DomainManagerConfigDialogProps,
) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <DomainManagerConfigDialog
        {...props}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ ...props }) => <DomainManagerConfigDialogExample {...props} />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'))
  },
}
