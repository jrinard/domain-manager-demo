import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { mergeClasses } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variants = cva('inline-flex grow', {
  variants: {
    col: {
      true: 'flex-col',
      false: 'flex-row',
    },
  },
  defaultVariants: {
    col: false,
  },
})
interface ListItemMainProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  className?: string
  to?: string
}
const ListItemMain = ({ col, children, className, to }: ListItemMainProps) => {
  return to ? (
    <Link to={to} className={mergeClasses([variants({ col }), className])}>
      {children}
    </Link>
  ) : (
    <div className={mergeClasses([variants({ col }), className])}>
      {children}
    </div>
  )
}
ListItemMain.displayName = 'ListItemMain'

export { ListItemMain }
