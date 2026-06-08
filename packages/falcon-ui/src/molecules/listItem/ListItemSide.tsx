import { mergeClasses } from '@falcon/style'
import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

interface ListItemSideProps extends PropsWithChildren {
  className?: string
  to?: string
}
const ListItemSide = ({ children, className, to }: ListItemSideProps) => {
  return to ? (
    <Link
      to={to}
      className={mergeClasses([
        className,
        `flex shrink grow-0 flex-row items-center gap-2`,
      ])}
    >
      {children}
    </Link>
  ) : (
    <div
      className={mergeClasses([
        className,
        `flex shrink grow-0 flex-row items-center gap-2`,
      ])}
    >
      {children}
    </div>
  )
}
ListItemSide.displayName = 'ListItemSide'

export { ListItemSide }
