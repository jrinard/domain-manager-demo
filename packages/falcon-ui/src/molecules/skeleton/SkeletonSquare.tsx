import { mergeClasses, VariantProps } from '@falcon/style'
import React from 'react'

import sizeVariants from './sizeVariants'

export interface SkeletonSquareProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sizeVariants> {}

const SkeletonSquare = ({ className, size, ...props }: SkeletonSquareProps) => {
  return (
    <div
      aria-label="loading"
      className={mergeClasses(
        'animate-pulse rounded-md bg-neutral-800',
        sizeVariants({ size }),
        className,
      )}
      {...props}
    />
  )
}
SkeletonSquare.displayName = 'SkeletonSquare'

export { SkeletonSquare }
