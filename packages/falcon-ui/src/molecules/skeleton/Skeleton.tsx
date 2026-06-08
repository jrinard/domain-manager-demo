import { cva, mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { PropsWithChildren } from 'react'
import SizeVariants from './sizeVariants'

import { SkeletonSquare } from './SkeletonSquare'

const variants = cva('animate-pulse rounded-md bg-neutral-800', {
  variants: {},
  defaultVariants: {},
})

export interface SkeletonProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

const Skeleton = ({ children, className, ...props }: SkeletonProps) => {
  return (
    <div className={mergeClasses(variants({}), className)} {...props}>
      {children}
    </div>
  )
}
Skeleton.displayName = 'Skeleton'

Skeleton.Circle = ({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size: VariantProps<typeof SizeVariants>['size']
}) => {
  return (
    <Skeleton
      className={mergeClasses(
        SizeVariants({ size }),
        `rounded-full`,
        className,
      )}
      {...props}
    />
  )
}
const SkeletonCircle = Skeleton.Circle

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'h-2',
      sm: 'h-3',
      base: 'h-4',
      lg: 'h-5',
      xl: 'h-6',
      '2xl': 'h-7',
      '3xl': 'h-8',
      '4xl': 'h-9',
      '5xl': 'h-10',
      '6xl': 'h-11',
    },
    length: {
      micro: 'w-6',
      xshort: 'w-14',
      short: 'w-24',
      medium: 'w-40',
      long: 'w-64',
      xlong: 'w-96',
      '1/2': 'w-1/2',
      '1/3': 'w-1/3',
      '1/4': 'w-1/4',
      '3/4': 'w-3/4',
      '2/3': 'w-2/3',
      '1/6': 'w-1/6',
      '5/6': 'w-5/6',
    },
  },
  defaultVariants: {
    size: 'base',
    length: 'medium',
  },
})
const SkeletonText = ({
  className,
  size,
  length,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof textVariants>) => {
  return (
    <Skeleton
      aria-label="loading"
      className={mergeClasses(textVariants({ size, length }), className)}
      {...props}
    />
  )
}
Skeleton.Text = SkeletonText

const containerVariants = cva('bg-muted animate-pulse rounded-md opacity-10', {
  variants: {},
  defaultVariants: {},
})

const SkeletonContainer = ({
  className,
  height,
  width,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  height?: string | number
  width?: string | number
}) => {
  return (
    <div
      aria-label="loading"
      className={mergeClasses(containerVariants({}), className)}
      style={{ height, width }}
      {...props}
    />
  )
}
Skeleton.Container = SkeletonContainer

Skeleton.Square = SkeletonSquare
export {
  Skeleton,
  SkeletonCircle,
  SkeletonSquare,
  SkeletonText,
  SkeletonContainer,
}
