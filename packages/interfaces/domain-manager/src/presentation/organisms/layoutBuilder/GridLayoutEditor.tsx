import React, { useCallback, useMemo } from 'react'
import type {
  ScreenSizeLayout,
  HomeSectionType,
  HomeSectionTyped,
} from '@domain/configs'
import { areasToGridNodes } from './layout-converters/areasToGridNodes'
import { gridNodesToAreas } from './layout-converters/gridNodesToAreas'
import { GridLayoutCanvas } from './GridLayoutCanvas'
import type {
  ControlledNode,
  ExternalDragConfig,
} from './dnd/useGridStackController'
import { mergeClasses, cva, VariantProps } from '@falcon/style'
import { generateMockSectionData } from '@domain/schemas'

const variants = cva('bg-site-bg relative h-full w-full', {
  variants: {
    deviceSize: {
      desktop: '',
      tablet: 'max-w-[552px]',
      mobile: 'max-w-[448px]',
    },
  },
})

type BreakpointKey = 'layout' | 'tablet_layout' | 'mobile_layout'

export interface GridLayoutEditorProps extends VariantProps<typeof variants> {
  deviceSize?: 'desktop' | 'tablet' | 'mobile'
  layout: ScreenSizeLayout
  columns?: number
  sections: HomeSectionTyped[]
  lockedNames?: Set<string>
  onLayoutChange: (next: ScreenSizeLayout) => void
  onSelect?: (sectionId: string | null) => void
  renderItem?: (name: string) => React.ReactNode
  onAddSection?: (
    sectionType: HomeSectionType,
    sectionData: Record<string, unknown>,
    columnSpan: number,
    coordinates: { x: number; y: number; w: number; h: number },
  ) => void
}

function isEmptyName(name: string) {
  return name.startsWith('EMPTY-')
}

export const GridLayoutEditor: React.FC<GridLayoutEditorProps> = ({
  deviceSize = 'desktop',
  layout,
  columns,
  sections,
  lockedNames,
  onLayoutChange,
  onSelect,
  renderItem,
  onAddSection,
}) => {
  const cols = columns ?? layout.columns

  const items = useMemo(() => {
    const nodes = areasToGridNodes(layout)
    return nodes
      .filter((n) => !isEmptyName(n.name))
      .map((n) => ({
        name: n.name,
        x: n.x,
        y: n.y,
        w: n.w,
        h: n.h,
        locked: lockedNames ? lockedNames.has(n.name) : false,
      }))
  }, [layout, lockedNames])

  const handleItemsChange = useCallback(
    (next: ControlledNode[]) => {
      let nextAreas = gridNodesToAreas(next, cols) as any[]

      // Sanity: ensure every section has a slot; if missing, append a new full-width row
      const usedNames = new Set<string>()
      ;(nextAreas as any[]).forEach((row: any[]) =>
        row.forEach((c: any) => usedNames.add(c.name)),
      )
      const required = new Set<string>(
        sections.map((s) => s.layout_position.areaName || s.id || ''),
      )
      required.forEach((name) => {
        if (!name) return
        if (!usedNames.has(name)) {
          nextAreas = [...(nextAreas as any[]), [{ name, columnSpan: cols }]]
        }
      })
      onLayoutChange({ columns: cols as any, areas_by_name: nextAreas as any })
    },
    [cols, onLayoutChange, sections],
  )

  const onAreaSelect = useCallback(
    (areaName: string | null) => {
      if (!areaName) {
        onSelect?.(null)
        return void 0
      }

      const sectionForArea = sections.find(
        (s) => s.layout_position?.areaName === areaName,
      )
      onSelect?.(sectionForArea?.id ?? null)
    },
    [onSelect, sections],
  )

  const handleExternalDrop = useCallback(
    (el: HTMLElement, x: number, y: number, w: number, h: number) => {
      // Extract section metadata from the dropped element
      const sectionType = el.getAttribute(
        'data-section-type',
      ) as HomeSectionType
      const defaultColumnSpan = parseInt(
        el.getAttribute('data-default-column-span') || '6',
        10,
      )

      // * Remove Filler Element, otherwise a meaningless placeholder Element remains in the DOM that the layout does not know about nor can control.
      el.remove()

      if (!sectionType || !onAddSection) {
        return
      }

      // Generate mock data for the section
      const mockData = generateMockSectionData(sectionType)

      // Use the actual dropped width if provided, otherwise use default
      const columnSpan = w || defaultColumnSpan

      // Call onAddSection with the section type and generated data
      onAddSection(sectionType, mockData, columnSpan, { x, y, w, h })
    },
    [onAddSection],
  )

  const externalDragConfig: ExternalDragConfig | undefined = onAddSection
    ? {
        selector: '.draggable-section-card',
        onExternalDrop: handleExternalDrop,
      }
    : undefined

  return (
    <div className={mergeClasses(variants({ deviceSize }), 'relative')}>
      {items.length === 0 && (
        <div className="pointer-events-none absolute inset-0 z-10 flex min-h-[520px] items-center justify-center">
          <div className="text-grayscale-400 text-center text-sm">
            Drag and drop sections here
          </div>
        </div>
      )}
      <GridLayoutCanvas
        columns={cols}
        items={items}
        onItemsChange={handleItemsChange}
        onSelect={onAreaSelect}
        renderItem={renderItem}
        externalDragConfig={externalDragConfig}
      />
    </div>
  )
}
