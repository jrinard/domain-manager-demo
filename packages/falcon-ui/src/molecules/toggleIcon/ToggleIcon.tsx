import { Icon, IconProps } from '@falcon/icons'
import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, {
  ElementRef,
  forwardRef,
  ComponentPropsWithoutRef,
  useState,
} from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'

const variants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      heavy: {
        true: 'state-on:bg-site-bg state-on:text-site-fg',
        false: '',
      },
    },
    defaultVariants: {
      heavy: false,
    },
  },
)

export interface ToggleIconProps
  extends IconProps,
    VariantProps<typeof variants> {
  unselectedIcon?: string
  selected?: boolean
  onSelectedChange?: (value: boolean) => void
}

const ToggleIcon = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & ToggleIconProps
>(
  (
    {
      color,
      className,
      unselectedIcon,
      icon,
      size,
      selected,
      onSelectedChange,
      heavy,
    },
    ref,
  ) => {
    const [value, setValue] = useState<boolean>(!!selected)
    const unselectedIconValue = unselectedIcon || `${icon}-outline`
    return (
      <TogglePrimitive.Root
        ref={ref}
        className={mergeClasses(variants({ heavy }))}
        defaultPressed={value}
        onPressedChange={(pressed) => {
          setValue(pressed)
          onSelectedChange && onSelectedChange(pressed)
        }}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <Icon
          size={size}
          color={color}
          icon={value ? icon : unselectedIconValue}
        />
      </TogglePrimitive.Root>
    )
  },
)

ToggleIcon.displayName = 'ToggleIcon'

export { ToggleIcon }
