import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { TextInput, IconButton } from '../../index'
import { ListEditable } from './ListEditable'

type ExampleItem = { label: string; id: number }

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
      onCancel={(item) => {
        return
      }}
      items={items}
      itemBuilder={(item, options) => {
        const itemIndx = items.findIndex(
          (innerItem) => innerItem.id === item.id
        )
        if (itemIndx === -1) return

        return (
          <li className="p-1" key={item.id}>
            {options.isEditing ? (
              <div className="w-full">
                <TextInput
                  value={editingValue}
                  onChange={(e) => {
                    setEditingValue(e.target.value)
                  }}
                />
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <span>{item.label}</span>
                <IconButton
                  icon="edit"
                  onClick={() => {
                    setEditingValue(item.label)
                    options.setEditing(true)
                  }}
                />
              </div>
            )}
          </li>
        )
      }}
    />
  )
}
describe('ListEditable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExampleListEditable />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<ExampleListEditable />)
    expect(screen.getByText('Type 1')).toBeInTheDocument()
  })
})
