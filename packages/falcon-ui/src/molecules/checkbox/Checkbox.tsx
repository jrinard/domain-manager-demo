import { Icon } from '@falcon/icons'
import { mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import React, { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const variants = cva('', {
  variants: {
    color: {
      onSurface:
        'border border-secondary text-secondary-fg group-surface-dark:text-secondary-fg group-surface-light:border-primary group-surface-light:text-primary',
      primary: 'border-primary text-primary',
      secondary: 'border-secondary-fg text-secondary-fg',
      accent: 'border-accent text-accent',
      current: 'fill-current',
      error: 'border-error text-error',
      info: 'border-info text-info',
      warn: 'border-warn text-warn',
      success: 'border-success text-success',
    },
    size: {
      xl: 'size-6',
      lg: 'size-5',
      base: 'size-4',
      sm: 'size-3',
      xs: 'size-2',
    },
  },
  defaultVariants: {
    color: 'onSurface',
    size: 'base',
  },
})

export type CheckboxProps = ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof variants>

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ checked, color, className, size, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={mergeClasses(
        'state-checked:text-secondary-foreground peer shrink-0 rounded-sm border border-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 px-0 py-0',
        variants({ color, size }),
        className,
      )}
      aria-labelledby={props.id || props.name}
      checked={checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={mergeClasses(
          'flex items-center justify-center text-current',
        )}
      >
        <Icon
          icon={checked === 'indeterminate' ? 'minus' : 'check'}
          size={size === 'sm' || size === 'xs' ? 'xs' : 'sm'}
          color={color}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
