import { mergeClasses } from '@falcon/style'
import * as React from 'react'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={mergeClasses('bg-site-bg rounded-lg', className)}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

export { TableHeader }
