import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { isEqual } from 'lodash'

import type { DiscGraphValues, IncompleteDiscGraphValues } from './types'

const LINE_HEIGHT_RATIO = 20 / 28

export interface PlotSummary {
  dPercentage: number
  iPercentage: number
  sPercentage: number
  cPercentage: number
  d: number
  i: number
  s: number
  c: number
  dBR: number
  iBR: number
  sBR: number
  cBR: number
  total: number
}

export interface GraphSummaries {
  public: PlotSummary
  private: PlotSummary
}

export function useDISCSizes(
  discValues?: DiscGraphValues | IncompleteDiscGraphValues,
): GraphSummaries {
  return useMemo((): GraphSummaries => {
    if (!dataIsCompletedProfile(discValues)) {
      return {
        public: getGraphSummary({ d: 0, i: 0, s: 0, c: 0 }),
        private: getGraphSummary({ d: 0, i: 0, s: 0, c: 0 }),
      }
    }

    const { d1, i1, s1, c1, d2, i2, s2, c2 } = discValues

    return {
      public: getGraphSummary({ d: d1, i: i1, s: s1, c: c1 }),
      private: getGraphSummary({ d: d2, i: i2, s: s2, c: c2 }),
    }
  }, [discValues])
}

export function dataIsCompletedProfile(
  discValues?: DiscGraphValues | IncompleteDiscGraphValues,
): discValues is DiscGraphValues {
  return !!discValues && 'd1' in discValues
}

function getGraphSummary(data: {
  d: number
  i: number
  s: number
  c: number
}): PlotSummary {
  const d = convertTo100Scale(data.d)
  const i = convertTo100Scale(data.i)
  const s = convertTo100Scale(data.s)
  const c = convertTo100Scale(data.c)

  let total = d + i + s + c

  if (!total) {
    total = 1
  }

  const dPercentage = Math.round((d / total) * 100)
  const iPercentage = Math.round((i / total) * 100)
  const sPercentage = Math.round((s / total) * 100)
  const cPercentage = Math.round((c / total) * 100)

  return {
    dPercentage,
    iPercentage,
    sPercentage,
    cPercentage,
    dBR: determineBorderRadius(d),
    iBR: determineBorderRadius(i),
    sBR: determineBorderRadius(s),
    cBR: determineBorderRadius(c),
    d,
    i,
    s,
    c,
    total,
  }
}

const BASE_BORDER_RADIUS = 4
const TOP_END_BORDER_RADIUS = 14
const BORDER_RADIUS_RANGE = TOP_END_BORDER_RADIUS - BASE_BORDER_RADIUS

function determineBorderRadius(value: number) {
  return BASE_BORDER_RADIUS + (value / 100) * BORDER_RADIUS_RANGE
}

const CONVERSION_MULTIPLIER = 100 / 16

function convertTo100Scale(historicalRangeValue: number) {
  const cappedValue = Math.min(Math.max(historicalRangeValue + 8, 0), 16)

  return cappedValue * CONVERSION_MULTIPLIER
}

interface OverrideData {
  position: 'absolute'
  color: string
  top?: number
  bottom?: number
  left?: number
  right?: number
}

const REQUIRED_PADDING = 12

function determineTextPositionStyles({
  letter,
  quadrantPadding,
  cellPercent,
  quadrantWidth,
  textCont,
}: {
  letter: 'd' | 'i' | 's' | 'c'
  quadrantPadding: number
  cellPercent: number
  quadrantWidth: number
  textCont: HTMLDivElement | null
}): CSSProperties | undefined {
  if (typeof cellPercent !== 'number' || !quadrantWidth || !textCont) {
    return undefined
  }

  const textData = textCont.getBoundingClientRect()

  const paddingAmount = quadrantPadding ?? REQUIRED_PADDING
  const wrapperWidth = quadrantWidth
  const cellWidth = Math.max(
    quadrantWidth * (cellPercent / 100),
    paddingAmount * 2,
  )
  const validCellLength = cellWidth - paddingAmount - paddingAmount
  const emptyWidth = wrapperWidth - cellWidth

  // * If:
  // * [1] - Text Box is taller than the cell height minus 12px padding on box sides
  // * [2] - Text Box is wider than the cell width minus 12px padding on box sides
  if (textData.height > validCellLength || textData.width > validCellLength) {
    const overrideData: OverrideData = {
      position: 'absolute',
      color: '#fff',
    }

    // * If:
    // * [1] - D or I Quadrant, then place text box above cell
    // * [2] - C or S Quadrant, then place text box below cell
    if (letter === 'd' || letter === 'i') {
      overrideData.top = emptyWidth - textData.height
    } else {
      overrideData.top = cellWidth + paddingAmount
    }

    // TODO: Account for wrapperData.left so that value is relative to Box and not Window

    // * If:
    // * [1] - D or C Quadrant, then place text box to the left of cell (No less than 12px from left edge)
    // * [2] - I or S Quadrant, then place text box to the right of cell (No more than 12px from right edge)
    if (letter === 'd' || letter === 'c') {
      overrideData.left = Math.max(emptyWidth - textData.width, paddingAmount)
    } else {
      overrideData.left = Math.max(
        Math.min(cellWidth, wrapperWidth - textData.width - paddingAmount),
        paddingAmount,
      )
    }

    return overrideData
  }

  return undefined
}

export function useDeferredTextPositionStyles({
  letter,
  quadrantPadding,
  graphSize,
  letterValue,
  textCont,
  wrapper,
}: {
  letter: 'd' | 'i' | 's' | 'c'
  quadrantPadding: number
  graphSize: number
  letterValue: number
  textCont: HTMLDivElement | null
  wrapper: HTMLDivElement | null
}): CSSProperties | undefined {
  const timeoutRef = useRef<number | undefined>(undefined)
  const [stylesOverride, updateStylesOverride] = useState<
    CSSProperties | undefined
  >(undefined)

  useEffect(() => {
    // * Just to avoid race condition of textCont not have size yet
    // * Since we are determining of DOM ref. There was some weird behavior
    // * Where occasionally it would not have text-box height properly calculated?
    timeoutRef.current = window.setTimeout(() => {
      const quadrantWidth =
        wrapper?.getBoundingClientRect().width ?? graphSize / 2

      const styles = determineTextPositionStyles({
        letter,
        quadrantPadding,
        cellPercent: letterValue,
        quadrantWidth,
        textCont,
      })

      if (!isEqual(styles, stylesOverride)) {
        updateStylesOverride(styles)
      }
    }, 0)

    return () => {
      window.clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const quadrantWidth = wrapper?.getBoundingClientRect().width ?? 0

    const styles = determineTextPositionStyles({
      letter,
      quadrantPadding,
      cellPercent: letterValue,
      quadrantWidth,
      textCont,
    })

    if (!isEqual(styles, stylesOverride)) {
      updateStylesOverride(styles)
    }
  }, [letterValue])

  return stylesOverride
}

export function determineQuadrantPadding(graphSize = 400): number {
  return (graphSize / 400) * 12
}

export function determineTextGapSize(graphSize = 400): number {
  return (graphSize / 400) * 6
}

export function determineFontSize(graphSize: number): React.CSSProperties {
  const fontSize = Math.max(graphSize / 20, 7)

  return {
    fontSize: `${fontSize}px`,
    lineHeight: `${fontSize / LINE_HEIGHT_RATIO}px`,
  }
}
