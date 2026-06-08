import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ToggleIcon } from './ToggleIcon'

const meta: Meta<typeof ToggleIcon> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/Toggle Icon',
  component: ToggleIcon,
  tags: ['autodocs'],
  argTypes: { onSelectedChange: { action: 'toggled' } },
}

export default meta
type Story = StoryObj<typeof ToggleIcon>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Selected: Story = {
  args: {
    selected: true,
    icon: 'star',
  },
  render: ({ onSelectedChange, icon, selected }) => (
    <ToggleIcon
      selected={selected}
      onSelectedChange={onSelectedChange}
      icon={icon}
    />
  ),
}

export const NotSelected: Story = {
  args: {
    selected: false,
    icon: 'star',
  },
  render: ({ onSelectedChange, icon, selected }) => (
    <ToggleIcon
      selected={selected}
      onSelectedChange={onSelectedChange}
      icon={icon}
    />
  ),
}

export const DifferentIcons: Story = {
  argTypes: {},
  render: ({ onSelectedChange, selected }) => (
    <ToggleIcon
      selected={selected}
      onSelectedChange={onSelectedChange}
      icon="arrow-up-bold"
      unselectedIcon="arrow-down-bold"
    />
  ),
}
