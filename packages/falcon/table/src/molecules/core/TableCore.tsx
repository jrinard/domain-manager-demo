import { mergeClasses } from '@falcon/style'
import * as React from 'react'
import { TableHeader } from './TableHeader'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className="w-full caption-bottom border-collapse"
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={''} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={'font-body text-site-fg bg-bg-contrast-low'}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={mergeClasses(
      '[tbody_&]:even:bg-list-item-even [tbody_&]:odd:bg-list-item-odd [tbody_&]:data-[state=selected]:even:bg-list-item-even-selected [tbody_&]:data-[state=selected]:odd:bg-list-item-odd-selected hover:bg-accent/10',
      className,
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={'font-body text-site-fg'} {...props} />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableCaption }
