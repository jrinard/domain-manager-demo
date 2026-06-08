import { Checkbox } from '@spacedock/falcon-ui'
import { Row, RowModel, Table } from '@tanstack/react-table'
import React from 'react'

export interface TableSelectAllCheckboxProps<TData extends object> {
  isLoading?: boolean
  onRowsSelected?: (data: TData[] | 'ALL', isSelected: boolean) => void
  /**
   * The Maximum number of rows that can be selected at a time
   */
  maxSelectableRows?: number
  isSomeRowsSelected?: boolean
  toggleAllRowsSelected: Table<TData>['toggleAllRowsSelected']
  selectedRowModel: RowModel<TData>
  rowModel: RowModel<TData>
}

const TableSelectAllCheckbox = <TData extends object>({
  isLoading,
  onRowsSelected,
  maxSelectableRows,
  toggleAllRowsSelected,
  isSomeRowsSelected,
  selectedRowModel,
  rowModel,
}: TableSelectAllCheckboxProps<TData>) => {
  return (
    <Checkbox
      color="secondary"
      disabled={isLoading}
      checked={
        selectedRowModel.rows.length === rowModel.rows.length ||
        (isSomeRowsSelected ? 'indeterminate' : false)
      }
      onCheckedChange={(value) => {
        if (maxSelectableRows !== undefined) {
          const selectedLength = selectedRowModel.rows.length
          if (selectedLength < maxSelectableRows) {
            const lastIndexSelected = selectedLength - 1
            const rowsToggled: Row<TData>[] = []
            for (
              let i = Math.max(0, lastIndexSelected);
              i < maxSelectableRows;
              i++
            ) {
              const row = rowModel.rowsById[i]
              row.toggleSelected(true)
              rowsToggled.push(row)
            }
            onRowsSelected?.('ALL', true)
            return
          }
          toggleAllRowsSelected(false)
          onRowsSelected?.('ALL', false)
          return
        }
        if (value === 'indeterminate') return
        toggleAllRowsSelected(value)
        onRowsSelected?.('ALL', value)
      }}
      aria-label="Select all"
    />
  )
}
TableSelectAllCheckbox.displayName = 'TableSelectAllCheckbox'

export { TableSelectAllCheckbox }
