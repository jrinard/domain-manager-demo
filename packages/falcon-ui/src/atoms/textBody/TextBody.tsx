import { cva, mergeClasses, VariantProps } from '@falcon/style'
import React, { PropsWithChildren } from 'react'

import { ColorVariants, ColorVariantsProps } from '../colors/colors'

const variants = cva('font-body', {
  variants: {
    size: {
      xl: 'text-2xl font-medium',
      l: 'text-xl font-medium',
      m: 'text-base font-medium leading-normal',
      s: 'text-sm font-medium leading-tight',
      xs: 'text-xs font-medium leading-none',
      '2xs': 'text-2xs font-medium leading-none',
    },
    weight: {
      none: '',
      light: 'font-light',
      medium: 'font-medium',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    lineThrough: {
      true: 'line-through',
      false: '',
    },
  },
  defaultVariants: {
    size: 'm',
    weight: 'none',
    truncate: false,
    lineThrough: false,
  },
})

export interface TextBodyProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  className?: string
  span?: boolean
  paragraph?: boolean
  color?: ColorVariantsProps['text']
  role?: string
  title?: string
  lineThrough?: boolean
}

const TextBody = ({
  children,
  color,
  size,
  className,
  weight,
  span,
  paragraph,
  role,
  lineThrough,
  truncate,
  ...props
}: TextBodyProps) => {
  if (span && paragraph) {
    throw Error('span and paragraph cannot be set at the same time')
  }
  const variantClasses = variants({ size, lineThrough, truncate, weight })
  if (paragraph) {
    return (
      <p
        role={role}
        className={mergeClasses(
          'my-2',
          variantClasses,
          ColorVariants({
            text: color ? color : 'auto',
            background: undefined,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </p>
    )
  } else if (span) {
    return (
      <span
        role={role}
        className={mergeClasses(
          variantClasses,
          ColorVariants({
            text: color ? color : 'auto',
            background: undefined,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
  return (
    <div
      role={role}
      className={mergeClasses(
        variantClasses,
        ColorVariants({ text: color ? color : 'auto', background: undefined }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
TextBody.displayName = 'TextBody'

export { TextBody }
