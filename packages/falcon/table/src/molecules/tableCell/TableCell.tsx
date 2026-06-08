import { ColorVariants, ColorVariantsProps } from '@spacedock/falcon-ui'
import * as React from 'react'
import { mergeClasses } from '@falcon/style'
import { forwardRef, TdHTMLAttributes } from 'react'

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  border?: ColorVariantsProps['border']
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ border, className, ...props }, ref) => (
    <td
      ref={ref}
      className={mergeClasses(
        'font-body text-secondary-fg border-b border-neutral-700 p-2.5 text-left print:text-black',
        ColorVariants({ border }),
        className,
      )}
      {...props}
    />
  ),
)
TableCell.displayName = 'TableCell'

export { TableCell }
