import { useState } from 'react'

export const useToggleSelectItems = <T>(
  initial?: Set<T>
): [T[], (item: T) => void, (items: T[]) => void] => {
  const [selectedItems, setSelectedItems] = useState<Set<T>>(
    initial ?? new Set()
  )
  const toggleItem = (item: T) => {
    if (selectedItems.has(item)) {
      setSelectedItems(
        new Set([...selectedItems].filter((value) => value !== item))
      )
    } else {
      setSelectedItems(new Set(selectedItems.add(item)))
    }
  }
  return [
    Array.from(selectedItems.values()),
    toggleItem,
    (items: T[]) => setSelectedItems(new Set<T>(items)),
  ]
}
