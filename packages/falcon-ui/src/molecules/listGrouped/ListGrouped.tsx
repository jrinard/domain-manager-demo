import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

import type { ListGroupProps } from './ListGroup'
import { ListGroup } from './ListGroup'

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

export interface ListGroupItem<T extends object> {
  items: T[]
  title: string
  key?: string
}
export interface ListGroupedProps<T extends object>
  extends Pick<
      ListGroupProps<T>,
      'itemBuilder' | 'selectedItems' | 'selectedKey'
    >,
    PropsWithChildren,
    VariantProps<typeof variants> {
  groups: ListGroupItem<T>[]
  className?: string
}

const ListGrouped = <T extends object>({
  direction,
  groups,
  itemBuilder,
  className,
  selectedItems,
  selectedKey,
}: ListGroupedProps<T>) => {
  return (
    <ul className={mergeClasses(variants({ direction }), className)}>
      {groups.map((group, index) => {
        return (
          <ListGroup<T>
            key={group.key ?? group.title + index}
            title={group.title}
            itemBuilder={itemBuilder}
            items={group.items}
            selectedItems={selectedItems}
            selectedKey={selectedKey}
          />
        )
      })}
    </ul>
  )
}
ListGrouped.displayName = 'ListGrouped'

export { ListGrouped }
