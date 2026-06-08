import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'
import { ColorVariants, ColorVariantsProps } from '../colors/colors'

const variants = cva('font-heading font-black print:text-black', {
  variants: {
    size: {
      1: 'text-title text-4xl',
      2: 'text-title-2 text-3xl',
      3: 'text-title-3 text-2xl leading-none',
      4: 'text-title-4 text-xl',
      5: 'text-title-5 text-lg',
      6: 'text-title-6 text-base',
    },
    inline: {
      true: 'inline',
      false: '',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    uppercase: {
      true: 'uppercase',
      false: '',
    },
  },
  defaultVariants: {
    uppercase: true,
    inline: false,
    truncate: false,
  },
})

export interface TextHeadingProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  color?: ColorVariantsProps['text']
  className?: string
}

const TextHeading = ({
  color = 'auto',
  size,
  truncate,
  children,
  uppercase,
  className,
  ...props
}: TextHeadingProps) => {
  const HeaderTagName = size === 1 ? 'h1' : size === 2 ? 'h2' : 'h3'

  return (
    <HeaderTagName
      className={mergeClasses(
        variants({ size, uppercase }),
        ColorVariants({ text: color }),
        className,
      )}
      {...props}
    >
      {children}
    </HeaderTagName>
  )
}
TextHeading.displayName = 'TextHeading'

export { TextHeading }
