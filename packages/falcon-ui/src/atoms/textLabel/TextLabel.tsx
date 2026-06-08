import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'

const variants = cva(
  'font-subheading text-lg font-semibold uppercase leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70',
  {
    variants: {
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary-fg',
        muted: 'text-muted-fg',
        success: 'text-success-fg',
        warning: 'text-warning-fg',
        danger: 'text-danger-fg',
        info: 'text-info-fg',
        auto: 'text-label group-surface-dark:text-label group-surface-light:text-primary',
      },
    },
    defaultVariants: {
      color: 'auto',
    },
  },
)

export interface TextLabelProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  className?: string
}

const TextLabel = ({
  color,
  children,
  className,
  ...props
}: TextLabelProps) => {
  return (
    <h5 className={mergeClasses(variants({ color }), className)} {...props}>
      {children}
    </h5>
  )
}
TextLabel.displayName = 'TextLabel'

export { TextLabel }
