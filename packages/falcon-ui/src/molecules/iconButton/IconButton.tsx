import { Icon, IconProps } from '@falcon/icons'
import { mergeClasses } from '@falcon/style'
import { useObjectRef } from '@react-aria/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variants = cva(
  'cursor-pointer bg-transparent drop-shadow-sm transition-all duration-150 ease-in focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justify-center',
  {
    variants: {
      hover: {
        outline:
          'hover:outline-secondary group-surface-light:hover:outline-primary rounded-full hover:outline',
        rectangle:
          'hover:bg-secondary group-surface-light:hover:bg-primary rounded-lg',
        none: '',
      },
      dense: {
        true: '',
        false: 'p-2',
      },
      size: {
        xs: 'min-w-6 min-h-6 p-1',
        sm: 'min-w-8 min-h-8 p-1.5',
        base: 'min-w-9 min-h-9 p-2',
        lg: 'min-w-10 min-h-10 p-2.5',
        xl: 'min-w-11 min-h-11 p-3',
        '2xl': 'min-w-12 min-h-12 p-3',
        '4xl': 'min-w-14 min-h-14 p-3.5',
        '5xl': 'min-w-16 min-h-16 p-4',
        '8xl': 'min-w-24 min-h-24 p-4',
      },
    },
    defaultVariants: {
      hover: 'rectangle',
      dense: true,
    },
  },
)

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> &
  IconProps

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, hover, dense, icon, color, size, isShownOn, ...props },
    refForward,
  ) => {
    const ref = useObjectRef(refForward)
    return (
      <button
        className={mergeClasses(variants({ dense, hover, size }), className)}
        ref={ref}
        {...props}
      >
        <Icon color={color} icon={icon} size={size} isShownOn={isShownOn} />
      </button>
    )
  },
)
IconButton.displayName = 'IconButton'

export { IconButton, variants as IconButtonVariants }
