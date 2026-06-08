import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React, { ForwardedRef, forwardRef, ReactNode } from 'react'

const variants = cva('flex', {
  variants: {
    direction: {
      col: 'flex-col',
      row: 'flex-row',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      1.5: 'gap-1.5',
      2: 'gap-2',
      2.5: 'gap-2.5',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
    },
  },
  defaultVariants: {
    direction: 'col',
    gap: 0,
  },
})

export interface ListProps<T extends object>
  extends VariantProps<typeof variants>,
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLUListElement>,
        HTMLUListElement
      >,
      'onSelect' | 'ref'
    > {
  items: T[] | undefined
  itemBuilder: (item: T, isSelected: boolean) => ReactNode
  selectedItems?: T[] | Set<T[keyof T]>
  selectedKey?: keyof T
}

const ListPrivate = <T extends object>(
  {
    direction,
    items,
    itemBuilder,
    selectedItems,
    selectedKey,
    gap,
    className,
    ...props
  }: ListProps<T>,
  ref?: ForwardedRef<HTMLUListElement> | undefined
) => {
  const isSelected = (item: T): boolean => {
    if (Array.isArray(selectedItems)) {
      if (selectedItems === undefined || selectedItems.length < 1) return false
      return (
        selectedItems.findIndex((selectedItem) =>
          selectedKey === undefined
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              selectedItem['id'] == null
              ? false
              : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                selectedItem['id'] === item['id']
            : selectedItem[selectedKey] == null
            ? false
            : selectedItem[selectedKey] === item[selectedKey]
        ) > -1
      )
    } else if (selectedItems instanceof Set) {
      if (selectedKey === undefined) {
        return false
      }
      return selectedKey in item && selectedItems.has(item[selectedKey])
    }

    return false
  }
  return (
    <ul
      className={mergeClasses(variants({ direction, gap }), className)}
      ref={ref}
      {...props}
    >
      {items && items.map((item) => itemBuilder(item, isSelected(item)))}
    </ul>
  )
}
ListPrivate.displayName = 'List'

export const List = forwardRef(ListPrivate) as <T extends object>(
  props: ListProps<T> & { ref?: ForwardedRef<HTMLUListElement> | undefined }
) => ReturnType<typeof ListPrivate>
