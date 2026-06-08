import type { ScreenSizeLayout } from '@domain/configs'
import { GridNode } from './types'

export function areasToGridNodes(layout: ScreenSizeLayout): GridNode[] {
  const columns = layout.columns
  const rows = layout.areas_by_name ?? []

  // Build occupancy grid of names per cell
  const grid: string[][] = []
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r]
    const cells = new Array<string>(columns)
    let c = 0
    for (const seg of row) {
      const span = Math.max(
        1,
        Math.min(columns - c, (seg as any).columnSpan || 1),
      )
      for (let i = 0; i < span; i++) {
        if (c + i < columns) cells[c + i] = (seg as any).name
      }
      c += span
      if (c >= columns) break
    }
    // fill any missing as undefined to keep length
    grid[r] = cells
  }

  const nodes: GridNode[] = []
  const visited = new Set<string>()
  const key = (x: number, y: number) => `${x},${y}`

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    if (!row) continue
    for (let x = 0; x < columns; x++) {
      const name = row[x]
      if (!name) continue
      const k = key(x, y)
      if (visited.has(k)) continue

      // Determine max width from (x,y)
      let w = 1
      while (x + w < columns && row[x + w] === name) w++

      // Determine max height while maintaining full width match
      let h = 1
      let yy = y + 1
      outer: while (yy < grid.length) {
        for (let xx = x; xx < x + w; xx++) {
          if ((grid[yy] || [])[xx] !== name) break outer
        }
        h++
        yy++
      }

      // Mark visited
      for (let yy2 = y; yy2 < y + h; yy2++) {
        for (let xx2 = x; xx2 < x + w; xx2++) {
          visited.add(key(xx2, yy2))
        }
      }

      nodes.push({ name, x, y, w, h })
    }
  }

  return nodes
}
