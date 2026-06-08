import { IconProps } from '@falcon/icons'
import { cva, VariantProps } from '@falcon/style'
import React, { ReactElement, useMemo } from 'react'

import {
  ButtonProps,
  IconButtonProps,
  List,
  ListItem,
  ListItemMain,
  ListItemSide,
  ListProps,
  SkeletonCircle,
  SkeletonText,
} from '@spacedock/falcon-ui'
import { User } from '../../data/user'
import { UserItem } from '../userItem/UserItem'

const variants = cva('flex flex-col', {
  variants: {},
  defaultVariants: {},
})

export interface UserListProps
  extends Omit<ListProps<User>, 'itemBuilder'>,
    VariantProps<typeof variants> {
  trailingBuilder?: (
    item: User,
    isSelected: boolean
  ) => ReactElement<ButtonProps | IconButtonProps | IconProps> | undefined
  isLoading?: boolean
  limit?: number
  onSelect?: (item: User) => void
  onUnselect?: (item: User) => void
}

const UserList = ({
  isLoading,
  trailingBuilder,
  limit = 6,
  items,
  selectedItems,
  onSelect,
  onUnselect,
  ...props
}: UserListProps) => {
  const limitedItems = useMemo(() => {
    return (items && [...items].splice(0, limit)) || []
  }, [items, limit])
  return (
    <>
      {isLoading && (
        <ListItem disabled>
          <ListItemSide>
            <SkeletonCircle size="10" />
          </ListItemSide>
          <ListItemMain col className="gap-1">
            <SkeletonText length="long" size="sm" />
            <SkeletonText length="medium" size="sm" />
          </ListItemMain>
        </ListItem>
      )}
      {!isLoading && items && items.length > 0 && (
        <List<User>
          {...props}
          items={limitedItems}
          selectedItems={selectedItems}
          selectedKey="id"
          itemBuilder={(item, isSelected) => {
            return (
              <UserItem
                key={item.id}
                isSelected={isSelected}
                item={item}
                onSelect={onSelect}
                onUnselect={onUnselect}
                trailingBuilder={trailingBuilder}
              />
            )
          }}
        />
      )}
    </>
  )
}
UserList.displayName = 'UserList'

export { UserList }
