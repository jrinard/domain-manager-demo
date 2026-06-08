import { ColumnDef, TableProps } from './Table'
import { Checkbox } from '@spacedock/falcon-ui'
import * as React from 'react'
import { TableSelectAllCheckbox } from '../tableSelectAllCheckbox/TableSelectAllCheckbox'

export const createColumns = <TData extends object, TValue>({
  maxSelectableRows,
  isLoading,
  onRowSelect,
  columns,
}: TableProps<TData, TValue>) => {
  const col: ColumnDef<TData, TValue>[] = [
    {
      id: 'select',
      accessorKey: 'id',
      header: ({ table }) => {
        return (
          <TableSelectAllCheckbox
            toggleAllRowsSelected={table.toggleAllRowsSelected}
            selectedRowModel={table.getSelectedRowModel()}
            maxSelectableRows={maxSelectableRows}
            isSomeRowsSelected={table.getIsSomeRowsSelected()}
            rowModel={table.getRowModel()}
          />
        )
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            data-testid={`${row.id}-checkbox`}
            color="secondary"
            disabled={isLoading || !row.getCanSelect()}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              if (onRowSelect) onRowSelect(row.original, !!value, row)
            }}
            aria-label="Select row"
          />
        )
      },
    },
  ]
  return onRowSelect ? col.concat(columns) : columns
}
