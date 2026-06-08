import { ButtonProps } from '@falcon/buttons'
import { IconProps } from '@falcon/icons'
import React, { ReactElement } from 'react'

import {
  Avatar,
  IconButtonProps,
  ListItem,
  ListItemMain,
  ListItemSide,
} from '@spacedock/falcon-ui'
import { User } from '../../data/user'

export interface UserItemProps {
  trailingBuilder?: (
    item: User,
    isSelected: boolean,
  ) => ReactElement<ButtonProps | IconButtonProps | IconProps> | undefined
  item: User
  isSelected: boolean
  onSelect?: (item: User) => void
  onUnselect?: (item: User) => void
}

const UserItem = ({
  trailingBuilder,
  isSelected,
  onSelect,
  onUnselect,
  item,
}: UserItemProps) => {
  return (
    <ListItem
      className="w-full"
      unselectable={!onSelect}
      key={item.id}
      onClick={
        onSelect && !isSelected
          ? () => onSelect(item)
          : onUnselect && isSelected
            ? () => onUnselect(item)
            : undefined
      }
    >
      <ListItemSide>
        <Avatar name={item.displayName} src={item.avatar} />
      </ListItemSide>
      <ListItemMain className="flex flex-col items-start pl-2">
        <div className="text-secondary" translate="no">
          {item.displayName}
        </div>
        <div className="text-secondary-fg text-xs font-light" translate="no">
          {item.team}
        </div>
      </ListItemMain>
      <ListItemSide>
        {trailingBuilder && trailingBuilder(item, isSelected)}
      </ListItemSide>
    </ListItem>
  )
}
UserItem.displayName = 'UserItem'

export { UserItem }
