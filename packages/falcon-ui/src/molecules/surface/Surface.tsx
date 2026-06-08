import React, { PropsWithChildren } from 'react'
import { cva, mergeClasses, VariantProps } from '@falcon/style'

const variants = cva('group', {
  variants: {
    light: {
      true: 'bg-secondary',
      false: 'bg-site-bg',
    },
  },
  defaultVariants: {
    light: false,
  },
})

export interface SurfaceProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  className?: string
}

const Surface = ({ light, children, className, ...props }: SurfaceProps) => {
  return (
    <div
      data-surface={light ? 'light' : 'dark'}
      className={mergeClasses(variants({ light }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
Surface.displayName = 'Surface'

export { Surface }
