import * as React from 'react'
import { mergeClasses } from '@falcon/style'
import { forwardRef, ThHTMLAttributes } from 'react'

export type TableCellProps = ThHTMLAttributes<HTMLTableCellElement>

const TableHead = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={mergeClasses(
        'font-heading text-secondary-fg p-2.5 text-left print:text-black',
        className,
      )}
      {...props}
    />
  ),
)
TableHead.displayName = 'TableHead'

export { TableHead }
