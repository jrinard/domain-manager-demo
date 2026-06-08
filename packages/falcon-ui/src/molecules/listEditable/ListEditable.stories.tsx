import { Icon } from '@falcon/icons'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ListEditable } from './ListEditable'
import {
  ListItem,
  ListItemMain,
  ListItemSide,
  TextInput,
  IconButton,
} from '../../index'

type ExampleItem = { label: string; id: number }

const meta: Meta<typeof ListEditable> = {
  title: 'DL: Falcon/Molecules/List Editable',
  component: ListEditable,
  tags: ['autodocs'],
}

const ExampleListEditable = () => {
  const [items, setItems] = React.useState([
    { label: 'Type 1', id: 1 },
    { label: 'Type 2', id: 2 },
    { label: 'Type 3', id: 3 },
  ])
  const [editingValue, setEditingValue] = React.useState('')
  return (
    <ListEditable<ExampleItem>
      onSave={(item) => {
        const itemIndx = items.findIndex(
          (innerItem) => innerItem.id === item.id
        )
        if (itemIndx !== -1) {
          const tempItems = items
          tempItems[itemIndx].label = editingValue
          setItems(tempItems)
        }
      }}
      // Optional property here for reference
      onCancel={(item) => {
        return
      }}
      items={items}
      selectedItems={[items[1]]}
      itemBuilder={(item, options) => {
        const itemIndx = items.findIndex(
          (innerItem) => innerItem.id === item.id
        )
        if (itemIndx === -1) return

        return (
          <ListItem unselectable key={item.id}>
            {options.isSelected && (
              <ListItemSide>
                <Icon icon="check"></Icon>
              </ListItemSide>
            )}
            <ListItemMain>
              {options.isEditing ? (
                <TextInput
                  value={editingValue}
                  onChange={(e) => {
                    setEditingValue(e.target.value)
                  }}
                />
              ) : (
                <span>{item.label}</span>
              )}
            </ListItemMain>
            {!options.isEditing && (
              <ListItemSide>
                <IconButton
                  icon="edit"
                  onClick={() => {
                    setEditingValue(item.label)
                    options.setEditing(true)
                  }}
                />
              </ListItemSide>
            )}
          </ListItem>
        )
      }}
    />
  )
}

export default meta
type Story = StoryObj<typeof ListEditable>

export const TextInputEditableList: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Example list with textInput editing',
      },
    },
  },
  render: ({ ...props }) => <ExampleListEditable />,
}
