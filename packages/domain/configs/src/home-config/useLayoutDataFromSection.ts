import { get, set } from 'lodash'
import type { HomeSection, SectionLayoutPosition } from './types'
import React from 'react'

export type OverrideLayoutData = {
  metadata: Partial<HomeSection['metadata']>
} & {
  style: Pick<React.CSSProperties, 'gridRow' | 'gridColumn' | 'zIndex'>
}

export function useLayoutDataFromSection({
  section,
  fallbackLayoutPosition,
  overrideLayoutData,
  bgImageURL,
}: {
  section: HomeSection
  fallbackLayoutPosition?: SectionLayoutPosition
  overrideLayoutData?: OverrideLayoutData
  bgImageURL?: string | null
}) {
  const { layout_position, metadata } = section
  let style: React.CSSProperties = {}
  let bgColor = metadata?.bgColor || 'grey'
  let areaName = layout_position.areaName

  let columnSpan = layout_position.areaName
    ? undefined
    : get(
        layout_position,
        'layout_position',
        get(fallbackLayoutPosition, 'columnSpan', 1),
      )
  let rowSpan = layout_position.areaName
    ? undefined
    : get(
        layout_position,
        'layout_position',
        get(fallbackLayoutPosition, 'rowSpan', 1),
      )

  if (overrideLayoutData) {
    areaName = undefined
    columnSpan = undefined
    rowSpan = undefined
    bgColor = overrideLayoutData.metadata.bgColor || bgColor
    style = { ...overrideLayoutData.style }
  }

  if (bgImageURL) {
    style = set(style, 'backgroundImage', `url(${bgImageURL})`)
    style = set(style, 'backgroundSize', 'cover')
    style = set(style, 'backgroundPosition', 'center')
    style = set(style, 'backgroundRepeat', 'no-repeat')
    if (!style.minHeight) {
      style = set(style, 'minHeight', '220px')
    }
  }

  return { columnSpan, rowSpan, areaName, bgColor, style }
}
