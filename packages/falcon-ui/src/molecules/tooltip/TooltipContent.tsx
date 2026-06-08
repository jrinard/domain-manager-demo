import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import { cva, VariantProps, mergeClasses } from '@falcon/style'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

const variants = cva(
  'animate-in fade-in-50 side-bottom:slide-in-from-top-1 side-left:slide-in-from-right-1 side-right:slide-in-from-left-1 side-top:slide-in-from-bottom-1 z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md',
  {
    variants: {
      color: {
        primary: 'bg-primary text-primary-fg border-secondary',
        'primary-muted': 'bg-muted text-muted-fg border-white/20',
        secondary: 'bg-secondary text-secondary-fg border-secondary',
        warn: 'bg-warning text-warning-fg border-warn',
        info: 'bg-info text-info-fg border-info',
        success: 'bg-success text-success-fg border-success',
        error: 'bg-error text-error-fg border-error',
        neutral: 'bg-site-bg text-site-fg border-secondary',
      },
    },
    defaultVariants: {
      color: 'neutral',
    },
  },
)

const variantsArrow = cva('', {
  variants: {
    color: {
      primary: 'fill-primary text-primary',
      'primary-muted': 'fill-primary-muted text-primary-muted',
      secondary: 'fill-secondary text-secondary',
      warn: 'fill-warning text-warning',
      info: 'fill-info text-info',
      success: 'fill-success text-success',
      error: 'fill-error text-error',
      neutral: 'fill-neutral text-neutral',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

export type ToolTipContentProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> &
  VariantProps<typeof variants>
const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ToolTipContentProps
>(
  (
    { className, color = 'primary', sideOffset = 17, children, ...props },
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={mergeClasses(variants({ color }), className)}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        width={12}
        height={9}
        className={variantsArrow({ color })}
      />
    </TooltipPrimitive.Content>
  ),
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export default TooltipContent
export { TooltipContent }
