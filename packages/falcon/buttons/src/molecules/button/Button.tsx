import * as React from 'react'
import { cva, mergeClasses, VariantProps } from '@falcon/style'

const variants = cva(
  'font-body focus-visible:ring-ring flex flex-row items-center justify-center gap-2 rounded text-base font-medium transition-all duration-200 ease-in focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-fg hover:bg-primary-subtle hover:text-primary-subtle-fg',
        secondary:
          'bg-secondary text-secondary-fg hover:bg-site-bg hover:text-site-fg',
        success:
          'bg-success text-success-fg hover:bg-success-subtle hover:bg-success-subtle-fg',
        warning:
          'bg-warning text-warning-fg hover:bg-warning-subtle hover:bg-warning-subtle-fg',
        danger:
          'bg-danger text-danger-fg hover:bg-danger-subtle hover:bg-danger-subtle-fg',
        ghost:
          'hover:bg-secondary hover:text-secondary-fg bg-transparent transition-all',
        'ghost-primary':
          'hover:bg-primary hover:text-primary-fg bg-transparent transition-all',
        'ghost-danger':
          'hover:bg-danger hover:text-danger-fg bg-transparent transition-all',
        fill: 'text-site-fg hover:bg-primary hover:text-primary-fg border border-current bg-transparent',
        'fill-danger':
          'text-site-fg hover:bg-danger hover:text-danger-fg hover:border-danger border border-current bg-transparent',
        neutral: 'bg-site-fg text-site-bg',
        contrast: 'bg-bg-contrast-low text-site-fg',
        outline:
          'border-border hover:bg-site-bg hover:text-site-fg border border-solid bg-transparent',
        ai: 'border-border hover:bg-site-bg hover:text-site-fg rainbow-border disabled:text-muted border border-solid bg-transparent disabled:cursor-not-allowed',
        disabled: 'bg-muted text-muted-fg cursor-not-allowed opacity-50',
        shadow:
          'border-grayscale-300 dark:border-grayscale-700 hover:bg-color-primary border bg-white text-white shadow-lg dark:bg-black',
      },
      size: {
        medium: 'px-3 py-2',
        mobileSidebar: 'flex w-full items-center justify-start px-2 py-1',
        small: 'px-1.5 py-1',
        text: 'm-1 h-10 whitespace-nowrap p-2',
        'text-thin': 'm-1 h-7 whitespace-nowrap p-1',
        fit: 'h-full w-full',
        tiny: 'm-1 h-7 whitespace-nowrap p-1.5 text-sm',
        large: 'min-h-14 py-3 py-4',
        xlarge: 'min-h-20 py-3.5 py-6',
        xxlarge: 'min-h-24 py-4 py-8',
      },
      filled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        filled: false,
        variant: 'primary',
        class:
          'bg-primary-subtle text-primary-subtle-fg hover:bg-primary-subtle hover:text-primary-subtle-fg',
      },
      {
        filled: false,
        variant: 'success',
        class:
          'bg-success-subtle text-success-subtle-fg hover:bg-success-subtle hover:text-success-subtle-fg',
      },
      {
        filled: false,
        variant: 'warning',
        class:
          'bg-warning-subtle text-warning-subtle-fg hover:bg-warning-subtle hover:text-warning-subtle-fg',
      },
      {
        filled: false,
        variant: 'danger',
        class:
          'bg-danger-subtle text-danger-subtle-fg hover:bg-danger-subtle hover:text-danger-subtle-fg',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'medium',
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, filled, ...props }, ref) => {
    return (
      <button
        className={mergeClasses(
          variants({
            variant: variant !== 'ai' && disabled ? 'disabled' : variant,
            size,
            filled,
          }),
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export interface DecoyButtonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {
  disabled?: boolean
}

const DecoyButton = React.forwardRef<HTMLDivElement, DecoyButtonProps>(
  ({ className, variant, size, disabled = false, filled, ...props }, ref) => {
    return (
      <div
        className={mergeClasses(
          variants({ variant: disabled ? 'disabled' : variant, size, filled }),
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
DecoyButton.displayName = 'DecoyButton'

export { Button, DecoyButton, variants as ButtonVariants }
