import { Button, DecoyButton } from '@falcon/buttons'
import { Icon, type ApprovedIcon } from '@falcon/icons'
import { mergeClasses } from '@falcon/style'
import * as React from 'react'

import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '../../components/ui/button-group'
import { Checkbox } from '../checkbox/Checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdownMenu/DropdownMenu'
import { IconButton } from '../iconButton/IconButton'
import { Label } from '../label/Label'
import type { ButtonGroupItemType, ButtonGroupItemsProps } from './types'

function renderItem(item: ButtonGroupItemType, index: number): React.ReactNode {
  const key =
    item.type !== 'separator'
      ? (item.key ?? `bg-item-${index}`)
      : `sep-${index}`

  if (item.type !== 'separator' && item.hidden) {
    return null
  }

  switch (item.type) {
    case 'separator':
      return <ButtonGroupSeparator key={key} className={item.className} />
    case 'custom':
      return <React.Fragment key={key}>{item.render()}</React.Fragment>
    case 'group':
      return (
        <ButtonGroup
          key={key}
          orientation={item.orientation ?? 'horizontal'}
          className={item.className}
        >
          <ButtonGroupItems items={item.items} />
        </ButtonGroup>
      )
    case 'icon-button':
      return (
        <IconButton
          key={key}
          type="button"
          icon={item.icon}
          aria-label={item['aria-label']}
          title={item.title}
          disabled={item.disabled}
          className={item.className}
          onClick={item.onClick}
        />
      )
    case 'checkbox': {
      const id = item.key ?? `bg-checkbox-${index}`
      return (
        <div
          key={key}
          className={mergeClasses('flex items-center gap-2', item.className)}
          title={item.title}
        >
          <Checkbox
            id={id}
            checked={item.checked}
            disabled={item.disabled}
            onCheckedChange={(v) => item.onChange(v === true)}
          />
          <Label textType="body" htmlFor={id} title={item.title}>
            {item.label}
          </Label>
        </div>
      )
    }
    case 'select': {
      const selId = item.key ?? `bg-select-${index}`
      return (
        <div
          key={key}
          className={mergeClasses(
            'flex min-w-0 flex-row items-center gap-1',
            item.className,
          )}
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
            className={mergeClasses(
              'border-input bg-site-bg text-site-fg focus-visible:ring-ring h-7 min-w-[8rem] rounded-md border px-2 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2',
            )}
            value={item.value}
            onChange={(e) => item.onChange(e.target.value)}
          >
            {item.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )
    }
    case 'dropdown':
      return (
        <DropdownMenu key={key}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="text"
              disabled={item.disabled}
              className={item.className}
            >
              {item.icon ? (
                <Icon icon={item.icon} data-icon="inline-start" />
              ) : null}
              {item.label}
              <Icon icon="chevron-down" data-icon="inline-end" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            {item.menuItems.map((mi, miIdx) => (
              <DropdownMenuItem
                key={`${key}-mi-${miIdx}`}
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
          </DropdownMenuContent>
        </DropdownMenu>
      )
    case 'button': {
      const {
        label,
        icon,
        iconPosition = 'start',
        onClick,
        href,
        variant = 'ghost',
        size = 'tiny',
        title,
        disabled,
        className,
      } = item
      const content = (
        <>
          {icon && iconPosition !== 'end' ? (
            <Icon icon={icon} data-icon="inline-start" />
          ) : null}
          {label}
          {icon && iconPosition === 'end' ? (
            <Icon icon={icon} data-icon="inline-end" />
          ) : null}
        </>
      )
      if (href && !disabled) {
        return (
          <a key={key} href={href} title={title} onClick={onClick}>
            <DecoyButton
              className={mergeClasses(className)}
              variant={variant}
              size={size}
            >
              {content}
            </DecoyButton>
            {content}
          </a>
        )
      }
      return (
        <Button
          key={key}
          type="button"
          variant={variant}
          size={size}
          title={title}
          disabled={disabled}
          className={mergeClasses('m-0', className)}
          onClick={onClick}
        >
          {content}
        </Button>
      )
    }
  }
}

const ButtonGroupItems: React.FC<ButtonGroupItemsProps> = ({
  items,
  orientation = 'horizontal',
  className,
}) => {
  return (
    <ButtonGroup orientation={orientation} className={className}>
      {items.map((item, index) => renderItem(item, index))}
    </ButtonGroup>
  )
}

ButtonGroupItems.displayName = 'ButtonGroupItems'

export { ButtonGroupItems }
