import React from 'react'

import type { DiscGraphValuesExtended } from '../discQuadrants/types'
import LegacyDISCHeatMap from './legacy-file'

export interface HeatmapProps {
  discValues: DiscGraphValuesExtended[]
  heatMapType: 'public' | 'private'
  onUserSelect?: (userID: number) => void
  heatMapWidth: number
  omitLabels?: boolean
}

const Heatmap = (props: HeatmapProps) => {
  return (
    <LegacyDISCHeatMap
      profiles={props.discValues}
      heatMapType={props.heatMapType}
      onUserSelect={props.onUserSelect}
      size={props.heatMapWidth}
      omitLabels={props.omitLabels}
    />
  )
}
Heatmap.displayName = 'Heatmap'

export { Heatmap }
