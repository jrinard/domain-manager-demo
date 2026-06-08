import React, { ReactNode } from 'react'
import { List, ListProps } from '../list/List'
import { Button } from '../../index'

export interface ListEditableProps<T extends object>
  extends Omit<ListProps<T>, 'itemBuilder' | 'ref'> {
  onSave: (item: T) => void | Promise<void>
  onCancel?: (item: T) => void | Promise<void>
  itemBuilder: (
    item: T,
    options: {
      isSelected: boolean
      isEditing: boolean
      setEditing: (value: boolean) => void
    }
  ) => ReactNode
}

const ListEditable = <T extends object>({
  itemBuilder,
  onSave,
  onCancel,
  ...props
}: ListEditableProps<T>) => {
  const [itemEditing, setItemEditing] = React.useState<T | undefined>()

  return (
    <List<T>
      {...props}
      itemBuilder={(item, isSelected) => {
        return (
          <div>
            {itemBuilder(item, {
              isSelected,
              isEditing: itemEditing === item,
              setEditing: (value: boolean) => {
                if (value) {
                  setItemEditing(item)
                } else {
                  setItemEditing(undefined)
                }
              },
            })}
            {itemEditing === item && (
              <div className="flex w-full justify-end gap-2 pt-2">
                <Button
                  value="Cancel"
                  variant="ghost"
                  onClick={async () => {
                    onCancel && (await onCancel(item))
                    setItemEditing(undefined)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  value="Save"
                  variant="primary"
                  onClick={async () => {
                    await onSave(item)
                    setItemEditing(undefined)
                  }}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
ListEditable.displayName = 'ListEditable'

export { ListEditable }
