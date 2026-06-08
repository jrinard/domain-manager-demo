import type { Row } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import * as React from 'react'
import { TableCell } from '../tableCell/TableCell'
import { TableHead } from '../tableHead/TableHead'
import { Table, TableBody, TableHeader, TableRow } from '../core/TableCore'
import { SkeletonContainer } from '@spacedock/falcon-ui'
import { pick } from 'lodash'
import { mergeClasses } from '@falcon/style'
import { createColumns } from './createColumns'
import { mapColumnToVisibility } from './mapColumnToVisibility'
import type { ColumnDef, TableProps } from './TableProps'

export function DataTable<TData extends object, TValue = string | number>(
  props: TableProps<TData, TValue>,
) {
  const {
    columns,
    data,
    rowIdentifierKey,
    selectedRows,
    setSelectedRows,
    isLoading,
    rowIsSelectable,
    paginationBuilder,
    maxSelectableRows,
    className,
    headerProps,
    cellProps,
    emptyMessage = 'No results.',
  } = props
  const generatedColumns = createColumns<TData, TValue>(props)
  const defaultPageSize = data && data?.length ? data.length : 1000
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState(
    mapColumnToVisibility<TData, TValue>(generatedColumns),
  )
  const [localRowSelection, localSetRowSelection] = React.useState<
    Record<string, boolean>
  >({})
  const rowSelection =
    selectedRows && setSelectedRows ? selectedRows : localRowSelection
  const setRowSelection = setSelectedRows ?? localSetRowSelection

  const table = useReactTable({
    data,
    columns: generatedColumns,
    enableRowSelection: (row: Row<TData>): boolean => {
      if (
        maxSelectableRows !== undefined &&
        table.getSelectedRowModel().rows.length >= maxSelectableRows
      ) {
        return false
      }
      return rowIsSelectable ? rowIsSelectable(row.original) : true
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (originalRowData, index, _parent) => {
      if (rowIdentifierKey && originalRowData[rowIdentifierKey]) {
        return `${originalRowData[rowIdentifierKey]}`
      }
      return `${index}`
    },
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
      sorting,
      rowSelection,
    },
  })

  // If paginationBuilder is not supplied to the Table then pageSize needs to be set to wipe state
  // Otherwise the table will reflect the previous table states
  React.useEffect(() => {
    if (paginationBuilder) return
    table.setPageSize(defaultPageSize)
  }, [paginationBuilder, defaultPageSize, table])

  return (
    <>
      <div className={mergeClasses('h-full overflow-y-auto', className)}>
        <Table>
          <TableHeader {...headerProps}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        (header.column.columnDef as ColumnDef<TData>)
                          .headerClassName
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cellProps}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                  {...cellProps}
                >
                  {isLoading ? (
                    <div className="flex">
                      <SkeletonContainer
                        width="100%"
                        height="40px"
                        className="flex items-center justify-center rounded-xl bg-neutral-800 text-center"
                      >
                        Loading
                      </SkeletonContainer>
                    </div>
                  ) : (
                    emptyMessage
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationBuilder &&
        paginationBuilder(
          table.getState().pagination,
          pick(
            table,
            'getCanPreviousPage',
            'setPageSize',
            'setPageIndex',
            'previousPage',
            'nextPage',
            'getCanNextPage',
            'getPageCount',
          ),
        )}
    </>
  )
}
DataTable.displayName = 'Table'

export { DataTable as Table }
export type { ColumnDef, TableProps }
