import { describe, it, expect } from 'vitest'
import type { ScreenSizeLayout } from '@domain/configs'
import { areasToGridNodes } from './areasToGridNodes'
import { gridNodesToAreas } from './gridNodesToAreas'

describe('areas <-> nodes conversion', () => {
  it('collapses vertical and horizontal spans into single nodes', () => {
    const layout: ScreenSizeLayout = {
      columns: 12,
      areas_by_name: [
        [
          { name: 'EMPTY-1', columnSpan: 3 },
          { name: 'card-1', columnSpan: 6 },
          { name: 'card-2', columnSpan: 3 },
        ],
        [
          { name: 'card-3', columnSpan: 3 },
          { name: 'card-1', columnSpan: 6 },
          { name: 'EMPTY-1', columnSpan: 3 },
        ],
      ],
    }

    const nodes = areasToGridNodes(layout)
    const byName = new Map(nodes.map((n) => [n.name, n]))
    expect(byName.get('card-1')).toEqual(
      expect.objectContaining({ x: 3, y: 0, w: 6, h: 2 }),
    )
    expect(byName.get('card-2')).toEqual(
      expect.objectContaining({ x: 9, y: 0, w: 3, h: 1 }),
    )
    expect(byName.get('card-3')).toEqual(
      expect.objectContaining({ x: 0, y: 1, w: 3, h: 1 }),
    )
  })

  it('round-trips nodes back to areas with gaps filled as EMPTY-*', () => {
    const layout: ScreenSizeLayout = {
      columns: 12,
      areas_by_name: [
        [
          { name: 'a', columnSpan: 4 },
          { name: 'b', columnSpan: 4 },
        ],
        [
          { name: 'a', columnSpan: 4 },
          { name: 'c', columnSpan: 8 },
        ],
      ],
    }
    const nodes = areasToGridNodes(layout)
    const areas = gridNodesToAreas(nodes, 12)
    expect(areas.length).toBeGreaterThanOrEqual(2)
    // First row should contain a and b segments (plus optional EMPTY)
    const row0Names = areas[0].map((s) => s.name)
    expect(row0Names).toContain('a')
    expect(row0Names).toContain('b')
    // Second row should contain a and c
    const row1Names = areas[1].map((s) => s.name)
    expect(row1Names).toContain('a')
    expect(row1Names).toContain('c')
  })
})
