import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './Tooltip'
import { Button } from '@falcon/buttons'
import { IconButton } from '../iconButton/IconButton'

const meta: Meta<typeof Tooltip> = {
  title: 'DL: Falcon/Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'info', 'warn', 'success', 'error'],
      control: { type: 'select' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'select' },
    },
    side: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          {Story()}
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const ColorPrimary: Story = {
  args: {
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color as "primary" _(hover over the button to reveal)_',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip color={props.color} content={<div>Tooltip is a fun thing</div>}>
        <Button>Friends</Button>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const ColorSecondary: Story = {
  args: {
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color as "secondary" _(hover over the button to reveal)_',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip color={props.color} content={<div>Tooltip is a fun thing</div>}>
        <IconButton icon="clock" />
      </Tooltip>
    </TooltipProvider>
  ),
}

export const ColorInfo: Story = {
  args: {
    color: 'info',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color as "info" _(hover over the button to reveal)_',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip color={props.color} content={<div>Tooltip is a fun thing</div>}>
        <Button>Friends</Button>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const ColorWarn: Story = {
  args: {
    color: 'warn',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color as "warn" _(hover over the icon to reveal)_',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip color={props.color} content={<div>Tooltip is a fun thing</div>}>
        <IconButton icon="eye" />
      </Tooltip>
    </TooltipProvider>
  ),
}

export const ColorError: Story = {
  args: {
    color: 'error',
  },
  parameters: {
    docs: {
      description: {
        story: 'Color as "error" _(hover over the icon to reveal)_',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip color={props.color} content={<div>Tooltip is a fun thing</div>}>
        <IconButton icon="eye" />
      </Tooltip>
    </TooltipProvider>
  ),
}

export const SideOffset: Story = {
  args: {
    color: 'info',
    sideOffset: 26,
  },
  parameters: {
    docs: {
      description: {
        story:
          'How far away the tooltip is from the trigger _(hover over the icon to reveal and use the controls to change the sideOffset)_',
      },
    },
  },
  render: ({ color, sideOffset, align }) => (
    <TooltipProvider>
      <Tooltip
        color={color}
        sideOffset={sideOffset}
        content={<div>Tooltip is a fun thing</div>}
      >
        <IconButton icon="eye" />
      </Tooltip>
    </TooltipProvider>
  ),
}

export const AlignAndSide: Story = {
  args: {
    color: 'info',
    align: 'center',
    side: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alignment and positioning of the arrow _(see controls)_',
      },
    },
  },
  render: ({ side, align, color, sideOffset }) => (
    <TooltipProvider>
      <Tooltip
        color={color}
        sideOffset={sideOffset}
        align={align}
        side={side}
        content={<div>Tooltip is a fun thing</div>}
      >
        <IconButton icon="eye" />
      </Tooltip>
    </TooltipProvider>
  ),
}

export const CodeShorthand: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Coding example of the shorthand form (see code)',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <Tooltip content={<div>Tooltip is a fun thing</div>}>
        <Button>Friends</Button>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const CodeLonghand: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Coding example of a more verbose (longhand) and more control (see code)',
      },
    },
  },
  render: (props) => (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger>
          <Button>Friends</Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>Tooltip is a fun thing</div>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  ),
}
