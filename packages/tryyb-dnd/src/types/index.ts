// Core draggable item interface (matches PlacedSection from LayoutBuilder)
export interface DraggableItem {
  id: string
  label: string
  columnSpan: number
  rowSpan: number
  x: number
  y: number
  locked?: boolean
  scaleFactor?: number
  baseHeight?: number
  sub_type?: string
  isDuplicate?: boolean
}

// Drag state types
export interface DragState {
  draggingSectionId: string | null
  leftDraggingSectionId: string | null
  rowDraggingSectionId: string | null
  movingSectionId: string | null
  swapTargetId: string | null
  allSwapTargets: string[]
  insertionTargetId: string | null
  dragStartX: number
  initialColumnSpan: number
  leftDragStartX: number
  initialLeftColumnSpan: number
  initialX: number
  dragStartY: number
  initialRowSpan: number
  moveStartY: number
  moveStartX: number
  initialMoveY: number
  initialMoveX: number
}

// Section configuration for adding new items
export interface SectionConfig {
  id: string
  label: string
  defaultColumnSpan: number
  defaultRowSpan: number
  scaleFactor?: number
  baseHeight?: number
}

// Hook options
import type { GridStackOptions } from 'gridstack'

export interface UseDragAndDropOptions {
  items: DraggableItem[]
  onItemsChange: (items: DraggableItem[]) => void
  onItemSelect?: (itemId: string | null) => void
  sectionList?: SectionConfig[]
  selectedSection?: string | null
  gridOptions?: Partial<GridStackOptions>
}

// Hook return type
export interface UseDragAndDropReturn {
  // State
  dragState: DragState

  // Refs
  gridRef: React.RefObject<HTMLDivElement>

  // Drag handlers
  startColumnDrag: (e: React.MouseEvent, sectionId: string) => void
  startLeftColumnDrag: (e: React.MouseEvent, sectionId: string) => void
  startRowDrag: (e: React.MouseEvent, sectionId: string) => void
  startSectionMove: (e: React.MouseEvent, sectionId: string) => void

  // Utility functions
  preventOverlap: (
    movingSection: DraggableItem,
    newX: number,
    newSpan: number,
  ) => { x: number; columnSpan: number }
  preventRowOverlap: (
    movingSection: DraggableItem,
    newRowSpan: number,
  ) => number

  // Grid interaction
  handleGridClick: (e: React.MouseEvent) => void
}
