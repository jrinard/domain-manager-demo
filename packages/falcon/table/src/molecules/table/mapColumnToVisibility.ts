import { ColumnDef } from './Table'
import { get, reduce } from 'lodash'

export const mapColumnToVisibility = <
  TData extends object,
  TValue = string | number,
>(
  columns: ColumnDef<TData, TValue>[],
) => {
  return reduce<ColumnDef<TData, TValue>, Record<string, boolean>>(
    columns,
    (result, item) => {
      if (item.id) {
        result[item.id] = item.defaultVisibility ?? true
      }
      if (get(item, 'accessorKey') !== undefined) {
        result[get(item, 'accessorKey') as unknown as string] =
          item.defaultVisibility ?? true
      }
      return result
    },
    {},
  )
}
