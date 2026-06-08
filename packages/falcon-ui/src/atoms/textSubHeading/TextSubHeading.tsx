import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'

const variants = cva('font-subheading text-2xl font-normal uppercase', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary-fg',
      auto: 'group-surface-dark:text-secondary-fg group-surface-light:text-primary',
    },
  },
  defaultVariants: {
    color: 'auto',
  },
})

export interface TextSubHeadingProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  className?: string
}

const TextSubHeading = ({ children, color, ...props }: TextSubHeadingProps) => {
  return (
    <h4
      className={mergeClasses(variants({ color }), props.className)}
      {...props}
    >
      {children}
    </h4>
  )
}
TextSubHeading.displayName = 'TextSubHeading'

export { TextSubHeading }
