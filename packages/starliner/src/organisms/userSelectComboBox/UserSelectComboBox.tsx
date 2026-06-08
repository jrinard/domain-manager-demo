import React from 'react'
import { ComboBox, ComboBoxProps } from '@spacedock/falcon-ui'

import { User } from '../../data/user'
import { UserItem } from '../userItem/UserItem'

export interface UserSelectComboBoxProps
  extends Pick<ComboBoxProps, 'fill' | 'value' | 'onChange' | 'id' | 'name'> {
  isLoading?: boolean
  items: User[]
  placeholder?: string
}

const UserSelectComboBox = ({
  isLoading,
  items,
  placeholder,
  fill,
  value,
  ...props
}: UserSelectComboBoxProps) => {
  return (
    <ComboBox
      {...props}
      value={value}
      isLoadingItems={isLoading}
      selectPlaceholder={placeholder ? placeholder : 'Select user'}
      items={
        items
          ? items.map((item) => ({
              value: `${item.id}`,
              item: <UserItem key={item.id} item={item} isSelected={false} />,
            }))
          : []
      }
      fill={fill}
      includeSearch={items ? items.length > 0 : false}
      searchPlaceholder={
        isLoading
          ? 'Loading...'
          : items.length > 0
          ? 'Search for user'
          : 'No users available'
      }
    />
  )
}
UserSelectComboBox.displayName = 'UserSelectComboBox'

export { UserSelectComboBox }
