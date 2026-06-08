import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React, { ReactElement, useMemo } from 'react'

import { Surface, TextInput } from '@spacedock/falcon-ui'
import { ApprovedIcon, Icon, IconProps } from '@falcon/icons'

import type { ListProps } from '@spacedock/falcon-ui'

import { User } from '../../data/user'
import { UserList } from '../userList/UserList'

const variants = cva('rounded-xl flex flex-col text-secondary', {
  variants: {},
  defaultVariants: {},
})

export interface SelectUsersProps
  extends Omit<ListProps<User>, 'itemBuilder'>,
    VariantProps<typeof variants> {
  isLoading?: boolean
  limit?: number
  onSelect?: (item: User) => void
  onUnselect?: (item: User) => void
  className?: string
  onSearch?: (value?: string) => void
  selectedIcon?: ApprovedIcon
  trailingIconBuilder?: (
    item: User,
    isSelected: boolean
  ) => ReactElement<IconProps>
}

const SelectUsers = ({
  onSearch,
  limit = 6,
  items,
  selectedItems,
  onSelect,
  onUnselect,
  selectedIcon,
  trailingIconBuilder,
  isLoading,
  className,
}: SelectUsersProps) => {
  const limitedItems = useMemo(() => {
    return (items && [...items].splice(0, limit)) || []
  }, [items, limit])
  if (selectedIcon && trailingIconBuilder) {
    throw new Error(
      'trailingIconBuilder and selectedIcon cannot both be defined'
    )
  }
  return (
    <Surface className={mergeClasses(variants({}), className)}>
      {onSearch && (
        <TextInput
          className="pb-2"
          placeholder="Search"
          leadingIcon="search"
          standalone
          onChange={(event) => onSearch(event.target.value)}
        />
      )}
      <UserList
        trailingBuilder={(item, isSelected) => {
          if (trailingIconBuilder) {
            return trailingIconBuilder(item, isSelected)
          }
          if (!trailingIconBuilder && isSelected) {
            return (
              <Icon
                icon={selectedIcon ? selectedIcon : 'check'}
                color="secondary"
              />
            )
          }
        }}
        items={limitedItems}
        selectedItems={selectedItems}
        isLoading={isLoading}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
      {!isLoading && items && items?.length < 1 && (
        <div className="text-secondary-fg justify-self-center">No Matches</div>
      )}
    </Surface>
  )
}
SelectUsers.displayName = 'SelectUsers'

export type SelectUsersUser = User
export { SelectUsers }
