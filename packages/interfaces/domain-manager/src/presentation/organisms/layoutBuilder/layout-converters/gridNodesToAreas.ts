import { GridNode } from './types'
import type { ScreenSizeLayout } from '@domain/configs'

export function gridNodesToAreas(
  nodes: GridNode[],
  columns: number,
): ScreenSizeLayout['areas_by_name'] {
  if (columns <= 0) return []
  const maxRow = nodes.reduce((m, n) => Math.max(m, n.y + n.h), 0)
  const rows: string[][] = Array.from(
    { length: maxRow },
    () => new Array<string>(columns),
  )

  for (const n of nodes) {
    for (let yy = n.y; yy < n.y + n.h; yy++) {
      if (!rows[yy]) continue
      for (let xx = n.x; xx < n.x + n.w; xx++) {
        if (xx >= 0 && xx < columns) rows[yy][xx] = n.name
      }
    }
  }

  const result: { name: string; columnSpan: number }[][] = []
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r] || []
    const out: { name: string; columnSpan: number }[] = []
    let c = 0
    let emptyIdx = 0
    while (c < columns) {
      const name = row[c]
      let span = 1
      while (c + span < columns && row[c + span] === name) span++
      if (name) {
        out.push({ name, columnSpan: span })
      } else {
        out.push({ name: `EMPTY-${r}-${emptyIdx++}`, columnSpan: span })
      }
      c += span
    }
    result.push(out)
  }
  return result as unknown as ScreenSizeLayout['areas_by_name']
}
