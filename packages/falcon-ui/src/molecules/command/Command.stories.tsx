import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from './Command'

const meta: Meta<typeof Command> = {
  title: 'DL: Falcon/Molecules/Command',
  component: Command,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Command>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const WithSuggestionAndSearch: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Primarily Used in ComboBox',
      },
    },
  },
  render: (props) => {
    return (
      <CommandDialog open {...props}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    )
  },
}
