import type * as React from 'react'

import type { ButtonProps } from '@falcon/buttons'
import type { ApprovedIcon } from '@falcon/icons'

export type ButtonGroupItemBase = {
  key?: string
  hidden?: boolean
  disabled?: boolean
  className?: string
}

export type ButtonGroupButtonItem = ButtonGroupItemBase & {
  type: 'button'
  label: string
  icon?: ApprovedIcon | string
  iconPosition?: 'start' | 'end'
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  href?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  title?: string
}

export type ButtonGroupIconButtonItem = ButtonGroupItemBase & {
  type: 'icon-button'
  icon: ApprovedIcon | string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  'aria-label': string
}

export type ButtonGroupCheckboxItem = ButtonGroupItemBase & {
  type: 'checkbox'
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  title?: string
}

export type ButtonGroupSelectItem = ButtonGroupItemBase & {
  type: 'select'
  label?: string
  value: string
  options: Array<{ label: string; value: string }>
  onChange: (value: string) => void
  /** Native select title / tooltip */
  title?: string
}

export type ButtonGroupDropdownMenuItem = {
  label: string
  icon?: ApprovedIcon | string
  onClick: () => void
  destructive?: boolean
  disabled?: boolean
}

export type ButtonGroupDropdownItem = ButtonGroupItemBase & {
  type: 'dropdown'
  label: string
  icon?: ApprovedIcon | string
  menuItems: ButtonGroupDropdownMenuItem[]
}

export type ButtonGroupSeparatorItem = {
  type: 'separator'
  className?: string
}

export type ButtonGroupNestedGroupItem = ButtonGroupItemBase & {
  type: 'group'
  orientation?: 'horizontal' | 'vertical'
  items: ButtonGroupItemType[]
}

export type ButtonGroupCustomItem = ButtonGroupItemBase & {
  type: 'custom'
  render: () => React.ReactNode
}

export type ButtonGroupItemType =
  | ButtonGroupButtonItem
  | ButtonGroupIconButtonItem
  | ButtonGroupCheckboxItem
  | ButtonGroupSelectItem
  | ButtonGroupDropdownItem
  | ButtonGroupSeparatorItem
  | ButtonGroupNestedGroupItem
  | ButtonGroupCustomItem

export interface ButtonGroupItemsProps {
  items: ButtonGroupItemType[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
}
