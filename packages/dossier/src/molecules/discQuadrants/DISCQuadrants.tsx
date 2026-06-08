import { mergeClasses } from '@falcon/style'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { DiscGraphValues, IncompleteDiscGraphValues } from './types'
import {
  determineFontSize,
  determineQuadrantPadding,
  determineTextGapSize,
  useDISCSizes,
  useDeferredTextPositionStyles,
} from './utils'
import type { PlotSummary } from './utils'

import './styles.scss'

const DEFAULT_GRAPH_SIZE = 400

type GraphType = 'Public' | 'Private'

interface Props {
  className?: string
  discValues?: DiscGraphValues | IncompleteDiscGraphValues
  graph: GraphType
  style?: CSSProperties
  size: number // * Size of Graph (Height || Width)
}

type Points = Omit<
  PlotSummary,
  'total' | 'dPercentage' | 'iPercentage' | 'sPercentage' | 'cPercentage'
>
const STARTING_POINTS: Points = {
  d: 50,
  i: 50,
  s: 50,
  c: 50,
  dBR: 0,
  iBR: 0,
  sBR: 0,
  cBR: 0,
}

const DISCQuadrants = (props: Props) => {
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [animating, updateAnimating] = useState(false)
  const [hasAnimated, updateHasAnimated] = useState(false)
  const [renderValues, updateRenderValues] = useState<Points>(STARTING_POINTS)

  const data = useDISCSizes(
    props.discValues && 'd1' in props.discValues ? props.discValues : undefined,
  )

  const graph = props.graph === 'Private' ? data.private : data.public

  const invalidGraph =
    graph.d === 50 && graph.i === 50 && graph.s === 50 && graph.c === 50

  useEffect(() => {
    updateRenderValues({
      d: graph.d,
      i: graph.i,
      c: graph.c,
      s: graph.s,
      dBR: graph.dBR,
      iBR: graph.iBR,
      cBR: graph.cBR,
      sBR: graph.sBR,
    })

    if (hasAnimated) return

    updateAnimating(true)

    delayTimeoutRef.current = setTimeout(() => {
      if (hasAnimated) return
      updateHasAnimated(true)
      updateAnimating(false)
    }, 800)

    return () => {
      if (!delayTimeoutRef.current) return

      clearTimeout(delayTimeoutRef.current)
    }
  }, [graph])

  const graphSize = props.size

  return (
    <div
      className={mergeClasses('quadrants-container with-bg', props.className)}
      style={{
        ...(props.style || {}),
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    >
      <div
        className={mergeClasses(
          'quadrants-bg-container',
          (animating || hasAnimated) && 'animated',
        )}
      >
        <div className="quadrants-bg-border" />
      </div>

      {invalidGraph ? (
        <p className="absolute flex h-full w-full flex-col items-center justify-center text-center text-base font-bold">
          Incomplete Profile
        </p>
      ) : (
        <>
          <section
            className={mergeClasses('quadrants-row', hasAnimated && 'animated')}
          >
            <LetterQuadrant
              letter="d"
              displayPercentage={graph.dPercentage}
              value={renderValues.d}
              borderRadius={renderValues.dBR}
              isAbove={renderValues.d >= 50}
              graphSize={graphSize}
            />

            <LetterQuadrant
              letter="i"
              displayPercentage={graph.iPercentage}
              value={renderValues.i}
              borderRadius={renderValues.iBR}
              isAbove={renderValues.i >= 50}
              graphSize={graphSize}
            />
          </section>

          <section
            className={mergeClasses('quadrants-row', hasAnimated && 'animated')}
          >
            <LetterQuadrant
              letter="c"
              displayPercentage={graph.cPercentage}
              value={renderValues.c}
              borderRadius={renderValues.cBR}
              isAbove={renderValues.c >= 50}
              graphSize={graphSize}
            />

            <LetterQuadrant
              letter="s"
              displayPercentage={graph.sPercentage}
              value={renderValues.s}
              borderRadius={renderValues.sBR}
              isAbove={renderValues.s >= 50}
              graphSize={graphSize}
            />
          </section>
        </>
      )}
    </div>
  )
}

interface LetterQuadrantProps {
  letter: 'd' | 'i' | 's' | 'c'
  displayPercentage: number
  value: number
  borderRadius: number
  isAbove?: boolean
  graphSize?: number
}

const LetterQuadrant = (props: LetterQuadrantProps) => {
  const [quadrantPadding, updateQuadrantPadding] = useState<number>(() => {
    return determineQuadrantPadding(props.graphSize ?? DEFAULT_GRAPH_SIZE)
  })
  const [fontStyle, updateFontStyle] = useState<React.CSSProperties>(() => {
    return determineFontSize(props.graphSize ?? DEFAULT_GRAPH_SIZE)
  })
  const [gapStyle, updateGapStyle] = useState<number>(() => {
    return determineTextGapSize(props.graphSize ?? DEFAULT_GRAPH_SIZE)
  })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cellRef = useRef<HTMLDivElement>(null)
  const textContRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const quadrantSize = wrapperRef.current?.getBoundingClientRect?.()?.width
    const graphSizeByQuadrantRef = quadrantSize ? quadrantSize * 2 : undefined

    const graphSize =
      graphSizeByQuadrantRef ?? props.graphSize ?? DEFAULT_GRAPH_SIZE

    updateFontStyle(determineFontSize(graphSize))
    updateGapStyle(determineTextGapSize(graphSize))
    updateQuadrantPadding(determineQuadrantPadding(graphSize))
  }, [props.graphSize])

  useEffect(() => {
    if (props.graphSize) return

    setTimeout(() => {
      const quadrantSize = wrapperRef.current?.getBoundingClientRect?.()?.width
      const graphSizeByQuadrantRef = quadrantSize ? quadrantSize * 2 : undefined

      const graphSize =
        graphSizeByQuadrantRef ?? props.graphSize ?? DEFAULT_GRAPH_SIZE

      updateFontStyle(determineFontSize(graphSize))
      updateGapStyle(determineTextGapSize(graphSize))
      updateQuadrantPadding(determineQuadrantPadding(graphSize))
    }, 250)
  }, [props.graphSize])

  const textOverrideStyles = useDeferredTextPositionStyles({
    letter: props.letter,
    letterValue: props.value,
    textCont: textContRef.current,
    wrapper: wrapperRef.current,
    quadrantPadding,
    graphSize: props.graphSize ?? DEFAULT_GRAPH_SIZE,
  })

  return (
    <div
      className={mergeClasses(
        'tree-row-cell-wrapper',
        props.letter,
        !props.isAbove && 'negative',
      )}
      ref={wrapperRef}
    >
      <div
        className={mergeClasses('quadrants-cell', props.letter)}
        style={{
          maxHeight: `${props.value}%`,
          maxWidth: `${props.value}%`,
          padding: `${quadrantPadding}px`,
          ...asBRVariable(props.borderRadius),
        }}
        ref={cellRef}
      >
        <div
          className="quadrants-text font-heading"
          style={{
            ...(textOverrideStyles ?? {}),
            gap: `${gapStyle}px`,
          }}
          ref={textContRef}
        >
          <span className="quadrants-text-label" style={fontStyle}>
            {letterText(props.letter)}
          </span>
          <span
            className="quadrants-text-percentage title-font"
            style={fontStyle}
          >
            {props.displayPercentage}%
          </span>
        </div>
      </div>
    </div>
  )
}

function letterText(letter: 'd' | 'i' | 's' | 'c') {
  switch (letter) {
    case 'd':
      return 'driver'
    case 'i':
      return 'influencer'
    case 's':
      return 'stabilizer'
    case 'c':
      return 'analyzer'
    default:
      return ''
  }
}

/**
 * For setting inline CSS Variable without TSLint Complaining about the property name
 * @param brValue - Number of Border Radius in Pixels
 * @returns CSSProperties Object
 */
function asBRVariable(brValue: number): Record<string, string> {
  return {
    '--cell-border-radius': `${brValue}px`,
  }
}

DISCQuadrants.displayName = 'DISCQuadrants'

export { DISCQuadrants }
