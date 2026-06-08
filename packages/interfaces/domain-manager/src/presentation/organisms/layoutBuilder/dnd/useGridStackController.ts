import { useEffect, useRef } from 'react'
import { getGridStack } from '@spacedock/tryyb-dnd'
type GridStack = any
type GridStackNode = any
type GridStackOptions = any

export interface ControlledNode {
  name: string
  x: number
  y: number
  w: number
  h: number
  locked?: boolean
}

export interface ExternalDragConfig {
  /** CSS selector for external draggable elements */
  selector: string
  /** Callback when an external item is dropped */
  onExternalDrop?: (
    el: HTMLElement,
    x: number,
    y: number,
    w: number,
    h: number,
  ) => void
}

export function useGridStackController({
  columns = 12,
  items,
  onItemsChange,
  onSelect,
  gridOptions,
  externalDragConfig,
}: {
  columns?: number
  items: ControlledNode[]
  onItemsChange: (next: ControlledNode[]) => void
  onSelect?: (name: string | null) => void
  gridOptions?: GridStackOptions
  externalDragConfig?: ExternalDragConfig
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInstanceRef = useRef<GridStack | null>(null)
  const itemsRef = useRef(items)
  const suppressChangeRef = useRef(false)

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const getGS = async () => await getGridStack()

  useEffect(() => {
    let destroyed = false
    const init = async () => {
      if (!gridRef.current) return
      const GS = await getGS()
      if (destroyed) return

      gridInstanceRef.current?.destroy(false)

      const grid = GS.init(
        {
          column: columns,
          cellHeight: 240,
          margin: 8,
          float: false,
          animate: false,
          acceptWidgets: true, // Enable accepting external widgets
          ...gridOptions,
        },
        gridRef.current,
      )
      gridInstanceRef.current = grid

      // Register existing DOM children as widgets
      const container = gridRef.current
      const children = Array.from(
        container.querySelectorAll<HTMLElement>('[data-dnd-id]'),
      )
      grid.batchUpdate()
      try {
        for (const child of children) {
          const id = child.getAttribute('data-dnd-id') || ''
          const item = itemsRef.current.find((i) => i.name === id)
          if (!item) continue
          child.classList.add('grid-stack-item')
          // Ensure content wrapper
          if (!child.querySelector('.grid-stack-item-content')) {
            const content = document.createElement('div')
            content.className = 'grid-stack-item-content'
            while (child.firstChild) content.appendChild(child.firstChild)
            child.appendChild(content)
          }
          child.setAttribute('gs-id', id)
          child.setAttribute('gs-x', String(item.x))
          child.setAttribute('gs-y', String(item.y))
          child.setAttribute('gs-w', String(item.w))
          child.setAttribute('gs-h', String(item.h))
          grid.makeWidget(child)
          const lock = !!item.locked
          grid.update(child, {
            id,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            noMove: lock,
            noResize: lock,
            locked: lock,
          })
        }
        // ensure column count is applied (avoid scaling when already set)
        if (
          typeof grid.getColumn === 'function' &&
          grid.getColumn() !== columns
        ) {
          grid.column(columns, 'none')
        }
      } finally {
        grid.batchUpdate(false)
      }

      const handleChange = (
        _e: Event,
        _nodes?: GridStackNode[] | GridStackNode | HTMLElement,
      ) => {
        if (suppressChangeRef.current) return
        // Build next state from ALL engine nodes so any auto-moved neighbors are captured
        const grid = gridInstanceRef.current
        const engineNodes: any[] = (grid?.engine?.nodes || []) as any[]
        if (!engineNodes.length) return
        const nextById = new Map<string, ControlledNode>()
        engineNodes.forEach((n) => {
          const id =
            (n.id as string) ||
            (n.el?.getAttribute('data-dnd-id') as string) ||
            ''
          if (!id) return
          nextById.set(id, {
            name: id,
            x: n.x ?? 0,
            y: n.y ?? 0,
            w: (n.w as number) ?? 1,
            h: (n.h as number) ?? 1,
            locked: n.locked ?? false,
          })
        })
        // Preserve other fields from itemsRef (like labels) but overwrite position
        const merged = itemsRef.current.map((it) => ({
          ...it,
          ...(nextById.get(it.name) || {}),
        }))
        onItemsChange(merged)
      }

      // Only commit changes on dragstop/resizestop so we don't persist
      // engine compaction of other items during live updates
      grid.on('dragstop', (_e: any, el: any) => handleChange(_e, el))
      grid.on('resizestop', (_e: any, el: any) => handleChange(_e, el))

      const clickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const itemEl = target.closest('[data-dnd-id]') as HTMLElement | null
        if (itemEl) onSelect?.(itemEl.getAttribute('data-dnd-id'))
        else onSelect?.(null)
      }
      gridRef.current.addEventListener('click', clickHandler)

      // Setup external drag and drop if configured
      if (externalDragConfig) {
        const GS = await getGS()

        // Query all draggable elements to set them up
        const draggableElements = document.querySelectorAll(
          externalDragConfig.selector,
        )

        // Create widget definitions for each draggable element
        const widgetDefinitions = Array.from(draggableElements).map((el) => {
          const htmlEl = el as HTMLElement
          const w = htmlEl.getAttribute('gs-w')
          const h = htmlEl.getAttribute('gs-h')
          return {
            w: w ? parseInt(w, 10) : 6,
            h: h ? parseInt(h, 10) : 1,
          }
        })

        // Setup drag-in with widget definitions
        GS.setupDragIn(
          externalDragConfig.selector,
          {
            appendTo: 'body',
            helper: 'clone',
          },
          widgetDefinitions.length > 0 ? widgetDefinitions : undefined,
        )

        // Listen for dropped event to handle external drops
        grid.on('dropped', (_e: any, previousNode: any, newNode: any) => {
          if (newNode && externalDragConfig.onExternalDrop) {
            // Get the dropped element
            const el = newNode.el as HTMLElement

            // Extract data from the element's data attributes
            // These should be on the original element that was cloned
            const sectionType = el.getAttribute('data-section-type')
            const defaultColumnSpan = el.getAttribute(
              'data-default-column-span',
            )

            // Check if this is an external drop by checking for our section type attribute
            if (sectionType) {
              externalDragConfig.onExternalDrop(
                el,
                newNode.x ?? 0,
                newNode.y ?? 0,
                newNode.w ??
                  (defaultColumnSpan ? parseInt(defaultColumnSpan, 10) : 6),
                newNode.h ?? 1,
              )
              // Remove the dropped element as we'll handle it via state updates
              grid.removeWidget(el, false)
            }
          }
        })
      }

      return () => {
        gridRef.current?.removeEventListener('click', clickHandler)
        grid.off('dragstop')
        grid.off('resizestop')
        if (externalDragConfig) {
          grid.off('dropped')
        }
      }
    }

    init()
    return () => {
      destroyed = true
      gridInstanceRef.current?.destroy(false)
      gridInstanceRef.current = null
    }
  }, [columns, gridOptions, onItemsChange, onSelect, externalDragConfig])

  // Keep in sync on prop changes
  useEffect(() => {
    const grid = gridInstanceRef.current
    if (!grid) return
    const byId = new Map(items.map((i) => [i.name, i]))
    grid.engine.nodes?.forEach((n: any) => {
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
        (typeof item.w === 'number' && item.w !== n.w) ||
        (typeof item.h === 'number' && item.h !== n.h)
      ) {
        suppressChangeRef.current = true
        grid.update(n.el!, {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          noMove: lock,
          noResize: lock,
          locked: lock,
        })
        suppressChangeRef.current = false
      }
    })
  }, [items])

  // Visual auto-height: measure content and adjust rows to reduce inner scroll
  useEffect(() => {
    const grid = gridInstanceRef.current
    if (!grid) return
    const container = gridRef.current
    if (!container) return
    const cellHeight = (grid as any).opts?.cellHeight || 240
    const margin = (grid as any).opts?.margin || 8

    const sizeToContent = () => {
      const nodes = grid.engine.nodes || []
      nodes.forEach((n: any) => {
        const content = n.el?.querySelector(
          '.grid-stack-item-content',
        ) as HTMLElement | null
        if (!content) return
        const contentHeight = content.scrollHeight
        const desired = Math.max(
          1,
          Math.ceil((contentHeight + margin * 2) / cellHeight),
        )
        if (desired !== n.h) {
          suppressChangeRef.current = true
          grid.update(n.el!, { h: desired })
          suppressChangeRef.current = false
        }
      })
    }

    const mo = new MutationObserver(() => sizeToContent())
    mo.observe(container, { childList: true, subtree: true })
    sizeToContent()
    return () => mo.disconnect()
  }, [items])

  return { gridRef }
}
