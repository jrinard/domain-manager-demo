import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ListGrouped, ListGroupItem } from './ListGrouped'
import { ListItem } from '../listItem/ListItem'

type ExampleItem = { label: string; id: number }

const meta: Meta<typeof ListGrouped<ExampleItem>> = {
  title: 'DL: Falcon/Molecules/List Grouped',
  component: ListGrouped,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ListGrouped<ExampleItem>>
export const GroupsPopulated: Story = {
  args: {
    groups: [
      {
        items: [
          { label: 'Label 1', id: 1 },
          { label: 'Label 2', id: 2 },
        ],
        title: 'Mine',
      },
      {
        items: [{ label: 'Label 5', id: 5 }],
        title: 'Theirs',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'List separated into groups',
      },
    },
  },
  render: ({ groups }) => (
    <ListGrouped<ExampleItem>
      groups={groups as ListGroupItem<ExampleItem>[]}
      itemBuilder={(item, isSelected) => {
        return <ListItem key={item.label}>{item.label}</ListItem>
      }}
    />
  ),
}

export const Selected: Story = {
  args: {
    groups: [
      {
        items: [
          { label: 'Label 1', id: 1 },
          { label: 'Label 2', id: 2 },
        ],
        title: 'Mine',
      },
      {
        items: [{ label: 'Label 5', id: 5 }],
        title: 'Theirs',
      },
    ],
    selectedItems: [{ label: 'Label 2', id: 2 }],
  },
  parameters: {
    docs: {
      description: {
        story: 'List separated into groups',
      },
    },
  },
  render: ({ groups, selectedItems }) => (
    <ListGrouped<ExampleItem>
      groups={groups}
      itemBuilder={(item, isSelected) => {
        return <ListItem key={item.label} selected={isSelected}>{item.label}</ListItem>
      }}
      selectedItems={selectedItems}
    />
  ),
}
