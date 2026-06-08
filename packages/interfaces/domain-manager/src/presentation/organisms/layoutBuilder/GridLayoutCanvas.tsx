import React from 'react'
import {
  useGridStackController,
  ControlledNode,
  ExternalDragConfig,
} from './dnd/useGridStackController'
import '../../../styles/gridstack-lite.css'

interface GridLayoutCanvasProps {
  columns: number
  items: ControlledNode[]
  onItemsChange: (next: ControlledNode[]) => void
  onSelect?: (areaName: string | null) => void
  renderItem?: (name: string) => React.ReactNode
  externalDragConfig?: ExternalDragConfig
}

export const GridLayoutCanvas: React.FC<GridLayoutCanvasProps> = ({
  columns,
  items,
  onItemsChange,
  onSelect,
  renderItem,
  externalDragConfig,
}) => {
  const { gridRef } = useGridStackController({
    items,
    onItemsChange,
    onSelect,
    columns,
    externalDragConfig,
  })
  return (
    <div
      ref={gridRef}
      className="grid-stack relative min-h-[520px] w-full"
      data-id="controlled-grid"
    >
      {items.map((it) => (
        <div
          key={it.name}
          data-dnd-id={it.name}
          className="grid-stack-item"
          gs-id={it.name}
          gs-x={String(it.x)}
          gs-y={String(it.y)}
          gs-w={String(it.w)}
          gs-h={String(it.h)}
        >
          <div className="grid-stack-item-content">
            {renderItem ? renderItem(it.name) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
