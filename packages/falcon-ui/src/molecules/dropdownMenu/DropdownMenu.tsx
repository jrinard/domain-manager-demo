import { ApprovedIcon, Icon, IconSizes } from '@falcon/icons'
import { mergeClasses } from '@falcon/style'
import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
} from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { TextBody } from '../../index'
import { omit } from 'lodash'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = (
  props: DropdownMenuPrimitive.DropdownMenuTriggerProps,
) => {
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      {props.children}
    </DropdownMenuPrimitive.Trigger>
  )
}

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuArrow = ({
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuArrowProps) => {
  return (
    <DropdownMenuPrimitive.Arrow
      width={20}
      fill="currentColor"
      className={mergeClasses(className)}
      {...props}
    />
  )
}

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={mergeClasses(
      'focus:bg-site-bg text-site-fg state-open:bg-accent font-body flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      inset ? 'pl-8' : '',
      className,
    )}
    {...props}
  >
    {children}
    <Icon icon="chevron-right" className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={mergeClasses(
      'bg-site-bg text-site-fg font-body animate-in side-bottom:slide-in-from-top-1 side-left:slide-in-from-right-1 side-right:slide-in-from-left-1 side-top:slide-in-from-bottom-1 border-primary z-50 mx-0.5 -mt-1 min-w-32 overflow-hidden rounded-md p-1 shadow-lg',
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClasses(
        'text-site-fg font-body',
        'bg-site-bg border-muted z-50 overflow-hidden rounded-md border p-1 shadow-lg',
        'animate-in side-bottom:slide-in-from-top-2 side-left:slide-in-from-right-2 side-right:slide-in-from-left-2 side-top:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    icon?: ApprovedIcon
    size?: IconSizes
  }
>(({ className, icon, inset, size, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={mergeClasses(
      'focus:outline-secondary bg-site-bg text-secondary-fg relative flex cursor-pointer select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:z-20 disabled:pointer-events-none disabled:opacity-50',
      inset ? 'pl-8' : '',
      className,
    )}
    {...omit(props, 'children')}
  >
    {icon ? (
      <Icon icon={icon} size={size || 'xl'} className="mr-1" />
    ) : (
      <div style={{ width: '1rem' }} />
    )}
    {props.children}
  </DropdownMenuPrimitive.Item>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    displayUnchecked?: boolean
  }
>(({ className, children, displayUnchecked, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    {...props}
    ref={ref}
    className={mergeClasses(
      'focus:outline-secondary text-secondary-fg font-body relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:z-20 disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    checked={checked}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      {displayUnchecked && (
        <Icon icon="square-outline" className="state-checked:invisible" />
      )}
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon icon="check" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={mergeClasses(
      'focus:bg-accent focus:text-accent-foreground font-body relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon icon="circle" color="current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={mergeClasses(
      'font-body px-2 py-1.5 text-sm font-semibold',
      (inset && 'pl-8') || '',
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={mergeClasses('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  children,
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <TextBody
      span
      size="xs"
      className={mergeClasses('ml-auto tracking-widest opacity-60', className)}
    >
      {children}
    </TextBody>
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps
export type DropdownMenuCheckboxItemProps =
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps
export type DropdownMenuItemChecked = DropdownMenuCheckboxItemProps['checked']

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuArrow,
}
