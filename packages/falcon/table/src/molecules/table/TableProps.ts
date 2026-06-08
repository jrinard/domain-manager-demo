import type {
  ColumnDef as ReactTableColumnDef,
  Table as TSTable,
  RowData,
  Row,
  PaginationState,
} from '@tanstack/react-table'
import { ReactNode } from 'react'
import * as React from 'react'
import { TableCell } from '../tableCell/TableCell'
import { TableHeader } from '../core/TableHeader'

export type ColumnDef<
  TData extends RowData,
  TValue = string | number,
> = ReactTableColumnDef<TData, TValue> & {
  headerClassName?: string
  defaultVisibility?: boolean
}

export interface TableProps<TData extends object, TValue = string | number> {
  rowIdentifierKey?: keyof TData
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  selectedRows?: Record<string, boolean>
  setSelectedRows?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
  emptyMessage?: ReactNode
  isLoading?: boolean
  onRowSelect?: (
    data: TData | 'ALL',
    isSelected: boolean,
    row?: Row<TData>,
  ) => void
  onRowsSelected?: (data: TData | 'ALL', isSelected: boolean) => void
  /**
   * The Maximum number of rows that can be selected at a time
   */
  maxSelectableRows?: number
  rowIsSelectable?: (row: TData) => boolean
  className?: string
  headerProps?: Pick<Parameters<typeof TableHeader>[0], 'className'>
  cellProps?: Pick<Parameters<typeof TableCell>[0], 'border'>
  paginationBuilder?: (
    paginationModel: PaginationState,
    paginationMethods: Pick<
      TSTable<TData>,
      | 'getCanPreviousPage'
      | 'setPageSize'
      | 'setPageIndex'
      | 'previousPage'
      | 'nextPage'
      | 'getCanNextPage'
      | 'getPageCount'
    >,
  ) => React.ReactNode
}
