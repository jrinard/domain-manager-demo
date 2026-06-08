import React, { PropsWithChildren } from 'react'

import * as styling from '@falcon/style'

const variants = styling.cva('flex flex-col', {
  variants: {
    bgColor: {
      site: 'bg-site-bg',
      opaque: 'bg-bg-contrast-low',
      grey: 'bg-grayscale-200 dark:bg-grayscale-900',
      transparent: 'bg-transparent',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      'contrast-low': 'bg-bg-contrast-low',
      'contrast-medium': 'bg-bg-contrast-medium',
      'contrast-high': 'bg-bg-contrast-high',
      inherit: 'bg-inherit',
    },
    textColor: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted',
      warning: 'text-warning',
      info: 'text-info',
      success: 'text-success',
      error: 'text-error',
      site: 'text-site',
      inherit: 'text-inherit',
      'grayscale-light': 'text-grayscale-100',
      'grayscale-dark': 'text-grayscale-900',
    },
    columnSpan: {
      auto: 'col-span-auto',
      full: 'col-span-full',
      12: 'col-span-12',
      11: 'col-span-11',
      10: 'col-span-10',
      9: 'col-span-9',
      8: 'col-span-8',
      7: 'col-span-7',
      6: 'col-span-6',
      5: 'col-span-5',
      4: 'col-span-4',
      3: 'col-span-3',
      2: 'col-span-2',
      1: 'col-span-1',
    },
    rowSpan: {
      auto: 'row-span-auto',
      full: 'row-span-full',
      12: 'row-span-12',
      11: 'row-span-11',
      10: 'row-span-10',
      9: 'row-span-9',
      8: 'row-span-8',
      7: 'row-span-7',
      6: 'row-span-6',
      5: 'row-span-5',
      4: 'row-span-4',
      3: 'row-span-3',
      2: 'row-span-2',
      1: 'row-span-1',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    bgColor: 'transparent',
    rounded: 'none',
    textColor: 'inherit',
  },
})

export interface CardSizingWrapperProps
  extends PropsWithChildren,
    styling.VariantProps<typeof variants> {
  className?: string
  areaName?: string
  style?: React.CSSProperties
}

const CardSizingWrapper = ({
  className,
  areaName,
  bgColor,
  columnSpan,
  rowSpan,
  rounded,
  textColor,
  style = {},
  ...props
}: CardSizingWrapperProps) => {
  return (
    <div
      {...props}
      className={styling.mergeClasses(
        variants({
          ...(areaName
            ? { bgColor, textColor, rounded }
            : { bgColor, textColor, columnSpan, rowSpan, rounded }),
        }),
        className,
      )}
      style={areaName ? { gridArea: areaName, ...style } : style}
    >
      <div className="flex-1 h-full">{props.children}</div>
    </div>
  )
}
CardSizingWrapper.displayName = 'CardSizingWrapper'

export { CardSizingWrapper }
