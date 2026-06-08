import { mergeClasses } from '@falcon/style'
import { PropsWithChildren, ReactNode } from 'react'

import { List, ListProps } from '../list/List'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variants = cva('flex', {
  variants: {
    direction: {
      col: 'flex-col',
      row: 'flex-row',
    },
  },
  defaultVariants: {
    direction: 'col',
  },
})

export interface ListGroupProps<T extends object>
  extends PropsWithChildren, ListProps<T>, VariantProps<typeof variants> {
  items: T[]
  itemBuilder: (item: T, isSelected: boolean) => ReactNode
  title: string
  emptyBuilder?: () => ReactNode
}

const ListGroup = <T extends object>({
  direction,
  emptyBuilder,
  title,
  items,
  itemBuilder,
  selectedItems,
  selectedKey,
}: ListGroupProps<T>) => {
  return (
    <li className={mergeClasses(variants({ direction }))}>
      <div className="bg-site-bg flex flex-row items-center py-2">
        <span className="text-site-fg pr-1 text-sm">{title}</span>
        <hr className="border-bg-contrast-medium mx-2 grow border" />
      </div>
      {emptyBuilder && items.length < 1 && emptyBuilder()}
      {items.length && (
        <List<T>
          items={items}
          itemBuilder={itemBuilder}
          selectedItems={selectedItems}
          selectedKey={selectedKey}
        />
      )}
    </li>
  )
}
ListGroup.displayName = 'ListGroup'

export { ListGroup }
