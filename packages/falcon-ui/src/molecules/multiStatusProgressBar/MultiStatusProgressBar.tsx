import type { VariantProps } from 'class-variance-authority'
import React from 'react'
import { cva, mergeClasses } from '@falcon/style'

const variants = cva('', {
  variants: {
    color: {
      warn: 'bg-warn',
      info: 'bg-info',
      error: 'bg-error',
      success: 'bg-success',
    },
  },
  defaultVariants: {
    color: 'success',
  },
})

export interface MultiStatusProgressBarProps {
  className?: string
  items: {
    color: VariantProps<typeof variants>['color']
    label: string
    percent: number
  }[]
}

const MultiStatusProgressBar = ({
  items,
  ...props
}: MultiStatusProgressBarProps) => {
  return (
    <div
      role="progressbar"
      className={mergeClasses(
        props.className,
        'flex h-4 w-full overflow-hidden rounded bg-neutral-700',
      )}
    >
      {items.map((item) => {
        return (
          <div
            key={item.label}
            className={mergeClasses(`h-4`, variants({ color: item.color }))}
            style={{ width: `${item.percent}%` }}
          />
        )
      })}
    </div>
  )
}
MultiStatusProgressBar.displayName = 'MultiStatusProgressBar'

export { MultiStatusProgressBar }
