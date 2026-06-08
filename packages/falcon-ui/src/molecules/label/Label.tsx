import { cva, mergeClasses } from '@falcon/style'
import * as LabelPrimitive from '@radix-ui/react-label'
import type { VariantProps } from 'class-variance-authority'
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const variants = cva(
  'leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 aria-disabled:cursor-not-allowed aria-disabled:opacity-70',
  {
    variants: {
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary-fg',
        auto: 'text-secondary-fg group-surface-dark:text-secondary-fg group-surface-light:text-primary',
      },
      textType: {
        label: 'text-lg font-bold uppercase',
        body: 'font-body text-base',
        navigation: 'font-subheading text-base font-semibold uppercase',
        input: 'text-inherit',
      },
    },
    defaultVariants: {
      color: 'auto',
      textType: 'label',
    },
  },
)

export type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof variants>

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ color, textType, className, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        id={props.htmlFor}
        className={mergeClasses(variants({ color, textType }), className)}
        {...props}
      />
    )
  },
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
