import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { List } from './List'
import { ListItem } from '../listItem/ListItem'

type ExampleItem = { label: string; id: number }

const meta: Meta<typeof List<ExampleItem>> = {
  title: 'DL: Falcon/Molecules/List',
  component: List,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof List<ExampleItem>>


/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const ItemsPopulated: Story = {
  args: {
    items: [
      { label: 'Label 1', id: 1 },
      { label: 'Label 2', id: 2 },
      { label: 'Label 3', id: 3 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Description',
      },
    },
  },
  render: ({ items }) => (
    <List<ExampleItem>
      items={items as ExampleItem[]}
      itemBuilder={(item, isSelected) => {
        return <ListItem key={item.label}>{item.label}</ListItem>
      }}
    />
  ),
}

export const Selected: Story = {
  args: {
    items: [
      { label: 'Label 1', id: 1 },
      { label: 'Label 2', id: 2 },
      { label: 'Label 3', id: 3 },
    ],
    selectedItems: [{ label: 'Label 2', id: 2 }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Description',
      },
    },
  },
  render: ({ items, selectedItems }) => (
    <List<ExampleItem>
      items={items}
      itemBuilder={(item, isSelected) => {
        return (
          <ListItem selected={isSelected} key={item.label}>
            {item.label}
          </ListItem>
        )
      }}
      selectedItems={selectedItems}
    />
  ),
}
