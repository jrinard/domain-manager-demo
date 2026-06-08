import { ButtonProps } from '@falcon/buttons'
import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, {
  PropsWithChildren,
  ComponentPropsWithoutRef,
  ReactElement,
  ElementRef,
} from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { IconButton, Label } from '../../index'

const variants = cva(
  'border-bg-contrast-medium state-open:animate-in state-closed:animate-out state-closed:fade-out-0 state-open:fade-in-0 state-closed:zoom-out-95 state-open:zoom-in-95 side-bottom:slide-in-from-top-2 side-left:slide-in-from-right-2 side-right:slide-in-from-left-2 side-top:slide-in-from-bottom-2 z-50 rounded-md border p-4 shadow-md outline-none',
  {
    variants: {
      variant: {
        secondary: 'bg-secondary text-secondary-fg fill-secondary',
        contrast: 'bg-bg-contrast-low text-site-fg fill-bg-contrast-low',
        site: 'bg-site-bg text-site-fg fill-site-bg',
        muted: 'bg-muted text-muted-fg fill-muted',
      },
    },
    defaultVariants: {
      variant: 'contrast',
    },
  },
)

export interface PopoverProps
  extends PropsWithChildren,
    VariantProps<typeof variants>,
    ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  headerText?: string
  hideHeader?: boolean
  action?: ReactElement<ButtonProps>
}

const Popover = ({
  modal = false,
  children,
  ...props
}: PopoverPrimitive.PopoverProps) => {
  return (
    <PopoverPrimitive.Root modal={modal} {...props}>
      {children}
    </PopoverPrimitive.Root>
  )
}

const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverPortal = PopoverPrimitive.Portal

export type PopoverContentRef = ElementRef<typeof PopoverPrimitive.Content>
const PopoverContent = React.forwardRef<PopoverContentRef, PopoverProps>(
  (
    {
      hideHeader,
      headerText,
      className,
      align = 'center',
      sideOffset = 4,
      children,
      action,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <PopoverPortal>
        <PopoverPrimitive.Content
          onInteractOutside={props.onInteractOutside}
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={mergeClasses(variants({ variant }), className)}
          {...props}
        >
          {!hideHeader && (
            <div className="flex justify-between">
              <Label>{headerText}</Label>
              <PopoverPrimitive.Close className="flex items-center">
                <IconButton icon="close" />
              </PopoverPrimitive.Close>
            </div>
          )}
          {children}
          {action && {
            ...action,
            props: {
              ...action.props,
              variant: 'primary',
              size: 'medium',
              className: 'mt-4 w-full mx-0',
            },
          }}
          <PopoverPrimitive.Arrow />
        </PopoverPrimitive.Content>
      </PopoverPortal>
    )
  },
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverPortal }
