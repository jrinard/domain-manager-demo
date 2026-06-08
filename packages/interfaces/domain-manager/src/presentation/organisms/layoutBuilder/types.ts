export interface PlacedSection {
  id: string
  label: string
  columnSpan: number
  rowSpan: number
  x: number
  y: number
  scaleFactor?: number
  baseHeight?: number
  sub_type?: string
  isDuplicate?: boolean
}

export interface SectionConfig {
  id: string
  label: string
  defaultColumnSpan: number
  defaultRowSpan: number
  scaleFactor?: number
  baseHeight?: number
}

export interface LayoutBuilderProps {
  className?: string
}
