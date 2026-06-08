import { useState, useCallback, useEffect, useRef } from 'react'
import type { GridStack, GridStackNode, GridStackOptions } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import {
  UseDragAndDropOptions,
  UseDragAndDropReturn,
  DragState,
  DraggableItem,
} from '../types'

// Lazy import helper to avoid SSR issues
const getGridStack = async () =>
  (await import('gridstack'))
    .GridStack as unknown as typeof import('gridstack').GridStack

export function useDragAndDrop(
  options: UseDragAndDropOptions,
): UseDragAndDropReturn {
  const {
    items,
    onItemsChange,
    onItemSelect,
    sectionList,
    selectedSection,
    gridOptions,
  } = options as UseDragAndDropOptions

  const gridRef = useRef<HTMLDivElement>(null)
  const gridInstanceRef = useRef<GridStack | null>(null)
  const itemsRef = useRef<DraggableItem[]>(items)

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  // Back-compat drag state (unused with GridStack, but kept for API parity)
  const [dragState] = useState<DragState>({
    draggingSectionId: null,
    leftDraggingSectionId: null,
    rowDraggingSectionId: null,
    movingSectionId: null,
    swapTargetId: null,
    allSwapTargets: [],
    insertionTargetId: null,
    dragStartX: 0,
    initialColumnSpan: 0,
    leftDragStartX: 0,
    initialLeftColumnSpan: 0,
    initialX: 0,
    dragStartY: 0,
    initialRowSpan: 0,
    moveStartY: 0,
    moveStartX: 0,
    initialMoveY: 0,
    initialMoveX: 0,
  })

  // Initialize GridStack and wire events
  useEffect(() => {
    let destroyed = false

    const init = async () => {
      if (!gridRef.current) return
      const GS = await getGridStack()
      if (destroyed) return

      // Destroy any previous instance
      gridInstanceRef.current?.destroy(false)

      const opts: GridStackOptions = {
        column: 12,
        cellHeight: 120,
        margin: 8,
        float: false,
        ...(gridOptions || {}),
      }

      const grid = GS.init(opts, gridRef.current)
      gridInstanceRef.current = grid

      // Register current DOM children as widgets
      grid.removeAll(false)
      const container = gridRef.current
      const children = Array.from(
        container.querySelectorAll<HTMLElement>('[data-dnd-id]'),
      )

      grid.batchUpdate()
      try {
        for (const child of children) {
          const id = child.getAttribute('data-dnd-id') || ''
          const item = itemsRef.current.find((i) => i.id === id)
          if (!item) continue

          child.classList.add('grid-stack-item')

          // Ensure content wrapper for GridStack structure
          if (!child.querySelector('.grid-stack-item-content')) {
            const content = document.createElement('div')
            content.className = 'grid-stack-item-content'
            while (child.firstChild) content.appendChild(child.firstChild)
            child.appendChild(content)
          }

          child.setAttribute('gs-id', id)
          child.setAttribute('gs-x', String(item.x))
          child.setAttribute('gs-y', String(item.y))
          child.setAttribute('gs-w', String(item.columnSpan))
          child.setAttribute('gs-h', String(item.rowSpan))

          grid.makeWidget(child)
          const lock = !!item.locked
          grid.update(child, {
            id,
            noMove: lock,
            noResize: lock,
            locked: lock,
          })
        }
      } finally {
        grid.batchUpdate(false)
      }

      const toDndItem = (n: GridStackNode): Partial<DraggableItem> => ({
        id:
          (n.id as string) ||
          (n.el?.getAttribute('data-dnd-id') as string) ||
          '',
        x: n.x ?? 0,
        y: n.y ?? 0,
        columnSpan: (n.w as number) ?? 1,
        rowSpan: (n.h as number) ?? 1,
      })

      const handleChange = (_e: Event, nodes?: GridStackNode[]) => {
        if (!nodes || nodes.length === 0) return
        const changed = new Map<string, Partial<DraggableItem>>()
        nodes.forEach((n) => {
          const d = toDndItem(n)
          if (d.id) changed.set(d.id, d)
        })
        const merged = itemsRef.current.map((it) => ({
          ...it,
          ...(changed.get(it.id) || {}),
        }))
        onItemsChange(merged)
      }

      grid.on('change', handleChange)
      grid.on('dragstop', handleChange)
      grid.on('resizestop', handleChange)

      // Selection via click
      const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const itemEl = target.closest('[data-dnd-id]') as HTMLElement | null
        if (itemEl) {
          const id = itemEl.getAttribute('data-dnd-id')
          onItemSelect?.(id)
        } else {
          onItemSelect?.(null)
        }
      }
      gridRef.current.addEventListener('click', clickHandler)

      // Cleanup listeners
      return () => {
        gridRef.current?.removeEventListener('click', clickHandler)
        grid.off('change')
        grid.off('dragstop')
        grid.off('resizestop')
      }
    }

    init()

    return () => {
      destroyed = true
      gridInstanceRef.current?.destroy(false)
      gridInstanceRef.current = null
    }
  }, [gridOptions, onItemsChange, onItemSelect])

  // Keep widget positions/locks in sync when items change from outside
  useEffect(() => {
    const grid = gridInstanceRef.current
    if (!grid) return

    const byId = new Map(items.map((i) => [i.id, i]))
    grid.engine.nodes?.forEach((n) => {
      const id =
        (n.id as string) || (n.el?.getAttribute('data-dnd-id') as string)
      if (!id) return
      const item = byId.get(id)
      if (!item) return
      const lock = !!item.locked
      n.locked = lock
      n.noMove = lock
      n.noResize = lock

      if (
        (typeof item.x === 'number' && item.x !== n.x) ||
        (typeof item.y === 'number' && item.y !== n.y) ||
        (typeof item.columnSpan === 'number' && item.columnSpan !== n.w) ||
        (typeof item.rowSpan === 'number' && item.rowSpan !== n.h)
      ) {
        grid.update(n.el!, {
          x: item.x,
          y: item.y,
          w: item.columnSpan,
          h: item.rowSpan,
          noMove: lock,
          noResize: lock,
          locked: lock,
        })
      }
    })
  }, [items])

  // Optional: click in empty grid to place selected palette item
  const handleGridClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      const onItem = !!target.closest('[data-dnd-id]')
      if (onItem) return

      if (!selectedSection || !sectionList) {
        onItemSelect?.(null)
        return
      }

      const rect = gridRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const columns = 12
      const columnWidth = rect.width / columns
      const rowHeight = 120
      const column = Math.floor(x / columnWidth)
      const row = Math.floor(y / rowHeight)

      const section = sectionList.find((s) => s.id === selectedSection)
      if (!section) return

      const newItem: DraggableItem = {
        id: `${selectedSection}-${Date.now()}`,
        label: section.label,
        columnSpan: section.defaultColumnSpan,
        rowSpan: section.defaultRowSpan,
        x: Math.max(0, Math.min(columns - section.defaultColumnSpan, column)),
        y: Math.max(0, row),
      }

      onItemsChange([...itemsRef.current, newItem])
    },
    [onItemsChange, onItemSelect, sectionList, selectedSection],
  )

  // No-op handlers to preserve return shape
  const noOp = useCallback(() => undefined, [])
  const preventOverlap = useCallback(
    (_moving: DraggableItem, newX: number, newSpan: number) => ({
      x: newX,
      columnSpan: newSpan,
    }),
    [],
  )
  const preventRowOverlap = useCallback(
    (_moving: DraggableItem, newRowSpan: number) => newRowSpan,
    [],
  )

  return {
    dragState,
    gridRef,
    startColumnDrag: noOp,
    startLeftColumnDrag: noOp,
    startRowDrag: noOp,
    startSectionMove: noOp,
    preventOverlap,
    preventRowOverlap,
    handleGridClick,
  }
}
