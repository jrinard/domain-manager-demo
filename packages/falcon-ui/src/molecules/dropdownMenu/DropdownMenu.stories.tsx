import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuProps,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItemChecked,
  DropdownMenuArrow,
} from './DropdownMenu'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'
import { IconButton } from '../iconButton/IconButton'

const meta: Meta<typeof DropdownMenu> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const StatefulSelections = () => {
  const [showStatusBar, setShowStatusBar] =
    useState<DropdownMenuItemChecked>(true)
  const [showActivityBar, setShowActivityBar] =
    useState<DropdownMenuItemChecked>(false)
  const [showPanel, setShowPanel] = useState<DropdownMenuItemChecked>(false)
  return (
    <div className="flex w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton icon="menu" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const WithSelections: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => <StatefulSelections />,
}

export const WithSubMenus: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => (
    <div className="flex w-full justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton icon="menu" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub menu</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub menu item</DropdownMenuItem>
                <DropdownMenuItem>Sub menu item</DropdownMenuItem>
                <DropdownMenuArrow />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

export const ExampleOnSurface: SurfaceStory<DropdownMenuProps> = {
  argTypes: {
    ...SurfaceStoryArgTypes,
    onSurface: {
      ...SurfaceStoryArgTypes.onSurface,
      control: {
        type: 'select' as const,
        options: SurfaceStoryArgTypes.onSurface.options,
      },
    },
  },
  args: {
    onSurface: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a DropdownMenu being on a surface ',
      },
    },
  },
  render: ({ onSurface }) => (
    <SurfaceForStory surface={onSurface}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton icon="menu" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SurfaceForStory>
  ),
}
