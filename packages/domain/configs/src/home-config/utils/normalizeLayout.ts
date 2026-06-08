import type {
  AreaNamesItem,
  ScreenSizeLayout,
  ExpectedColumnCounts,
} from '../types'

function makeEmptyName(rowIndex: number, emptyIndex: number) {
  return `EMPTY-${rowIndex}-${emptyIndex}`
}

export function normalizeLayout({
  areas_by_name,
  ...layout
}: ScreenSizeLayout): ScreenSizeLayout {
  const columns = layout.columns
  const rows = areas_by_name ?? []

  const normalizedRows = rows.map((row, rIdx) => {
    const out: AreaNamesItem[] = []
    let used = 0
    for (const seg of row) {
      const span = Math.max(
        1,
        Math.min(columns - used, (seg as any).columnSpan || 1),
      )
      if (span <= 0) continue
      out.push({
        name: (seg as any).name as string,
        columnSpan: span as ExpectedColumnCounts,
      })
      used += span
      if (used >= columns) break
    }
    let emptyIdx = 0
    while (used < columns) {
      const remaining = columns - used
      out.push({
        name: makeEmptyName(rIdx, emptyIdx++),
        columnSpan: remaining as ExpectedColumnCounts,
      })
      used = columns
    }
    return out
  })

  return {
    ...layout,
    areas_by_name: normalizedRows,
  }
}

export function isEmptyName(name: string | undefined): boolean {
  return !!name && name.startsWith('EMPTY-')
}
