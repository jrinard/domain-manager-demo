import { mergeClasses } from '@falcon/style'
import * as React from 'react'
import { noop } from 'lodash'

import { Icon, type ApprovedIcon } from '@falcon/icons'

import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../dropdownMenu/DropdownMenu'
import { Label } from '../label/Label'
import type { ButtonGroupItemType } from './types'

function flattenItems(items: ButtonGroupItemType[]): ButtonGroupItemType[] {
  const out: ButtonGroupItemType[] = []
  for (const item of items) {
    if (item.type !== 'separator' && item.hidden) {
      continue
    }
    if (item.type === 'group') {
      out.push(...flattenItems(item.items))
    } else {
      out.push(item)
    }
  }
  return out
}

function renderOverflowEntry(
  item: ButtonGroupItemType,
  index: number,
): React.ReactNode {
  const key =
    item.type !== 'separator'
      ? (item.key ?? `overflow-${index}`)
      : `overflow-sep-${index}`

  switch (item.type) {
    case 'separator':
      return <DropdownMenuSeparator key={key} />
    case 'button':
      return (
        <DropdownMenuItem
          key={key}
          disabled={item.disabled}
          icon={item.icon as ApprovedIcon | undefined}
          className={item.className}
          title={item.title}
          onSelect={() => {
            if (item.href && !item.disabled) {
              const stub = {
                stopPropagation: noop,
                preventDefault: noop,
              } as unknown as React.MouseEvent<HTMLAnchorElement>
              item.onClick?.(stub)
              window.location.assign(item.href)
              return
            }
            const stub = {
              stopPropagation: noop,
              preventDefault: noop,
            } as unknown as React.MouseEvent<HTMLButtonElement>
            item.onClick?.(stub)
          }}
        >
          {item.label}
        </DropdownMenuItem>
      )
    case 'icon-button':
      return (
        <DropdownMenuItem
          key={key}
          disabled={item.disabled}
          icon={item.icon as ApprovedIcon}
          title={item.title}
          onSelect={() => {
            const stub = {
              stopPropagation: noop,
              preventDefault: noop,
            } as unknown as React.MouseEvent<HTMLButtonElement>
            item.onClick?.(stub)
          }}
        >
          {item['aria-label']}
        </DropdownMenuItem>
      )
    case 'checkbox':
      return (
        <DropdownMenuCheckboxItem
          key={key}
          disabled={item.disabled}
          className={item.className}
          checked={item.checked}
          onCheckedChange={(v) => item.onChange(v === true)}
        >
          {item.label}
        </DropdownMenuCheckboxItem>
      )
    case 'select': {
      const selId = `${item.key ?? 'ov-sel'}-${index}`
      return (
        <DropdownMenuItem
          key={key}
          className={mergeClasses(
            '[&:focus]:bg-site-bg flex cursor-default flex-col items-stretch gap-1 py-2',
            item.className,
          )}
          onSelect={(e) => e.preventDefault()}
        >
          {item.label ? (
            <Label textType="input" htmlFor={selId}>
              {item.label}
            </Label>
          ) : null}
          <select
            id={selId}
            title={item.title}
            disabled={item.disabled}
            className="border-input bg-site-bg text-site-fg h-8 rounded-md border px-2 text-sm"
            value={item.value}
            onChange={(e) => item.onChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            {item.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </DropdownMenuItem>
      )
    }
    case 'dropdown':
      return (
        <DropdownMenuSub key={key}>
          <DropdownMenuSubTrigger className={item.className}>
            {item.icon ? (
              <Icon icon={item.icon} data-icon="inline-start" />
            ) : null}
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {item.menuItems.map((mi, miIdx) => (
              <DropdownMenuItem
                key={`${key}-sub-${miIdx}`}
                disabled={mi.disabled}
                icon={mi.icon as ApprovedIcon | undefined}
                className={mergeClasses(
                  mi.destructive ? 'text-danger focus:text-danger' : '',
                )}
                onSelect={() => mi.onClick()}
              >
                {mi.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    case 'custom':
      return (
        <DropdownMenuGroup key={key}>
          <div className="px-2 py-1">{item.render()}</div>
        </DropdownMenuGroup>
      )
    default:
      return null
  }
}

export interface ButtonGroupOverflowMenuContentProps {
  items: ButtonGroupItemType[]
}

/**
 * Renders {@link ButtonGroupItemType} entries inside a {@link DropdownMenuContent}
 * (e.g. when the action bar condenses into an overflow menu).
 */
const ButtonGroupOverflowMenuContent: React.FC<
  ButtonGroupOverflowMenuContentProps
> = ({ items }) => {
  const flat = flattenItems(items)
  return (
    <DropdownMenuGroup>
      {flat.map((item, index) => renderOverflowEntry(item, index))}
    </DropdownMenuGroup>
  )
}

ButtonGroupOverflowMenuContent.displayName = 'ButtonGroupOverflowMenuContent'

export { ButtonGroupOverflowMenuContent, flattenItems }
