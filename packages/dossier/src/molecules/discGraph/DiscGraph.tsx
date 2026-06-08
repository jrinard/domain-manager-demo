import { mergeClasses } from '@falcon/style'
import React, { Component, PropsWithChildren } from 'react'
import { has, get } from 'lodash'
import { fabric } from 'fabric'

import type { DiscGraphValues } from '../discQuadrants/types'

import './styles.scss'

const DISC_COLOR_D = '#f36062' //classic = f75f5b    - Team Tool af4986
const DISC_COLOR_I = '#69ade5' //classic = 69ade5    - Team Tool 2597d4
const DISC_COLOR_S = '#74f165' //classic = 74f165    - Team Tool 67b26a
const DISC_COLOR_C = '#bd5eda' // classic = bd5eda   - Team Tool fec42c

type GraphNumber = '1' | '2' | '3'

type DiscImageProps = {
  className?: string
  left?: number
  onCanvasRendered?: (
    canvas?: HTMLCanvasElement,
    GraphValues?: DiscGraphValues,
  ) => void
  onClick?: () => void
  innerRef?: (
    node: HTMLDivElement | null,
  ) => void | React.MutableRefObject<HTMLDivElement | null>
  graphValues?: DiscGraphValues
  scale?: number
  size: number
  title?: string
  top?: number
  graphNumber: GraphNumber
  isLoading: boolean
}

type State = {
  cPercentStr?: string
  dPercentStr?: string
  hasDisc: boolean
  iPercentStr?: string
  sPercentStr?: string
}

const Container = ({
  children,
  ...props
}: PropsWithChildren &
  Pick<
    DiscImageProps,
    'title' | 'size' | 'className' | 'onClick' | 'innerRef'
  > & { hasDisc: boolean }) => {
  return (
    <div
      className={mergeClasses(
        'cc-disc',
        props.hasDisc && 'cc-disc-has-bg disc-grid-bg-with-grid',
        props.className,
      )}
      onClick={props.onClick}
      ref={props.innerRef}
      style={{
        height: props.size,
        width: props.size,
      }}
      title={props.title}
    >
      {children}
    </div>
  )
}
class DiscGraph extends Component<DiscImageProps, State> {
  canvas?: HTMLCanvasElement | null

  static defaultProps = {
    size: 150,
    isLoading: false,
  }

  static displayName = 'DiscGraph'

  constructor(props: DiscImageProps) {
    super(props)

    this.state = {
      hasDisc: has(props, 'graphValues'),
    }

    this._addCanvasRef = this._addCanvasRef.bind(this)
  }

  get hasCompletedAssessment(): boolean {
    return (
      (get(this.props, 'graphValues.styleKey3', '').length > 0 || get(this.props, 'graphValues.nameStyle3', '').length > 0) &&
      this.props.graphValues != null
    )
  }

  componentDidMount() {
    if (this.props.graphValues) {
      this.beginDraw()
    }
  }

  componentDidUpdate(
    prevProps: Readonly<DiscImageProps>,
    prevState: Readonly<State>,
  ) {
    if (this.props !== prevProps) {
      this.beginDraw()
    }
  }

  _addCanvasRef(n: HTMLCanvasElement) {
    this.canvas = n
  }

  _onCanvasRendered(canvas?: HTMLCanvasElement) {
    if (this.props.onCanvasRendered) {
      this.props.onCanvasRendered(canvas, this.props.graphValues)
    }
  }

  _onNonCompleteDISC() {
    this._onCanvasRendered()
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Container {...this.props} hasDisc={this.state.hasDisc}>
          <div className="text-primary flex h-full w-full items-center justify-center">
            <span>Loading...</span>
          </div>
        </Container>
      )
    }

    if (!this.hasCompletedAssessment) {
      return (
        <Container {...this.props} hasDisc={this.state.hasDisc}>
          <div className="text-primary flex h-full w-full items-center justify-center">
            <span>No Assessment</span>
          </div>
        </Container>
      )
    }

    return (
      <Container {...this.props} hasDisc={this.state.hasDisc}>
        <div>
          <canvas
            className="cc-disc-graph"
            ref={this._addCanvasRef}
            height={`${this.props.size}px`}
            width={`${this.props.size}px`}
          />
          {this.state.dPercentStr && (
            <span className="cc-disc-label-sm cc-disc-label-sm-d">
              {' '}
              {this.state.dPercentStr}
            </span>
          )}
          {this.state.iPercentStr && (
            <span className="cc-disc-label-sm cc-disc-label-sm-i">
              {' '}
              {this.state.iPercentStr}
            </span>
          )}
          {this.state.sPercentStr && (
            <span className="cc-disc-label-sm cc-disc-label-sm-s">
              {' '}
              {this.state.sPercentStr}
            </span>
          )}
          {this.state.cPercentStr && (
            <span className="cc-disc-label-sm cc-disc-label-sm-c">
              {' '}
              {this.state.cPercentStr}
            </span>
          )}
        </div>
      </Container>
    )
  }

  //* You can pass a version number or string to get specific graph 3(perceived), 2(Core) or 1(Public)
  beginDraw() {
    if (this.hasCompletedAssessment) {
      const { graphNumber, graphValues } = this.props
      if (graphValues && graphNumber === '3') {
        this.drawDISC(
          {
            d: graphValues.d3,
            i: graphValues.i3,
            s: graphValues.s3,
            c: graphValues.c3,
          },
          {
            scale: this.props.scale || this.props.size / 115.5,
            round: true,
            left: this.props.left || this.props.size / 2,
            top: this.props.top || this.props.size / 2,
          },
        )
      } else if (graphValues && graphNumber === '2') {
        this.drawDISC(
          {
            d: graphValues.d2,
            i: graphValues.i2,
            s: graphValues.s2,
            c: graphValues.c2,
          },
          {
            scale: this.props.scale || this.props.size / 115.5,
            round: true,
            left: this.props.left || this.props.size / 2,
            top: this.props.top || this.props.size / 2,
          },
        )
      } else if (graphValues) {
        // Public Self
        this.drawDISC(
          {
            d: graphValues.d1,
            i: graphValues.i1,
            s: graphValues.s1,
            c: graphValues.c1,
          },
          {
            scale: this.props.scale || this.props.size / 115.5,
            round: true,
            left: this.props.left || this.props.size / 2,
            top: this.props.top || this.props.size / 2,
          },
        )
      }
    } else {
      this._onNonCompleteDISC()
    }
  }

  /** Draw a disc quadrant
   @param {Object} scores Scores object
   @param {Number} scores.d D score
   @param {Number} scores.i I score
   @param {Number} scores.s S score
   @param {Number} scores.c C score
   @param {Object} options Draw options {scale {Number}, round {Boolean}, left: {Number}, top: {Number}}
   @param {Number} options.scale
   @param {Boolean} options.round
   @param {Number} options.left
   @param {Number} options.top */
  drawDISC(
    scores: { d: number; i: number; s: number; c: number },
    options: {
      scale?: number
      top?: number
      left?: number
      round?: boolean
    } = {},
  ) {
    /* eslint-disable camelcase */
    const { left = 50, scale = 2.6, top = 45.28 } = options
    // Enter raw -8 to 8 DISC scores here
    const D_origin = Math.min(8, Math.max(scores.d, -8))
    const I_origin = Math.min(8, Math.max(scores.i, -8))
    const S_origin = Math.min(8, Math.max(scores.s, -8))
    const C_origin = Math.min(8, Math.max(scores.c, -8))
    // Convert scale of 0 to 50
    let D = ((D_origin + 8) * 50) / 16
    let I = ((I_origin + 8) * 50) / 16
    let S = ((S_origin + 8) * 50) / 16
    let C = ((C_origin + 8) * 50) / 16
    const DSCORE = D * scale
    const ISCORE = I * scale
    const SSCORE = S * scale
    const CSCORE = C * scale
    const total = D + I + S + C
    D = (D / total) * 100
    I = (I / total) * 100
    S = (S / total) * 100
    C = (C / total) * 100
    // Get rounded percentages
    if (options.round) {
      D = Math.round(D)
      I = Math.round(I)
      S = Math.round(S)
      C = Math.round(C)
    }
    // Handle potential rounding issues. The rounded scores may not equal 100% (Consider a D=12.2, I=30.4, S=28.1, C=29.3,
    // when rounded all will round down...). PeopleKeys seems to handle this by adjusting the D score (note this is true
    // even when it might make more sense to adjust a different score, as with the example numbers above) so we add the difference
    // of Sum(DISC) and 100 to D.
    D += 100 - (D + I + S + C)
    const DI_Slope = (DSCORE - ISCORE) / (-DSCORE - ISCORE) // term DI
    const IS_Slope = (ISCORE + SSCORE) / (SSCORE - ISCORE) // IS
    const SC_Slope = (-SSCORE + CSCORE) / (SSCORE + CSCORE) // SC
    const CD_Slope = (-CSCORE - DSCORE) / (-DSCORE + CSCORE) // CD
    // b = Y - (m * x)
    const DI_Yinter = DSCORE - DI_Slope * -DSCORE
    const CS_Yinter = SSCORE - SC_Slope * -SSCORE
    let CD_Xinter = (CSCORE - CD_Slope * -CSCORE) / CD_Slope
    let IS_Xinter = (SSCORE - IS_Slope * SSCORE) / IS_Slope
    const canvas = new fabric.StaticCanvas(this.canvas as HTMLCanvasElement)
    if (isNaN(CD_Xinter)) {
      CD_Xinter = CSCORE
    }
    if (isNaN(IS_Xinter)) {
      IS_Xinter = -CSCORE
    }
    const Dpoly = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: 0, y: DI_Yinter }, // D1
        { x: DSCORE, y: DSCORE }, // D0
        { x: CD_Xinter, y: 0 },
      ],
      {
        // D2
        stroke: '#000',
        strokeWidth: 1,
        fill: DISC_COLOR_D,
        flipY: true,
        flipX: true,
        opacity: scores.d < 0 ? 0.1 : 0.7,
      },
    )
    const dXMinusValue = Math.max(Math.abs(CD_Xinter), Math.abs(DSCORE))
    const dYMinusValue = Math.max(Math.abs(DI_Yinter), Math.abs(DSCORE))
    canvas.add(
      Dpoly.set({ left: left - dXMinusValue - 1, top: top - dYMinusValue - 1 }),
    ) // Render the D Polygon
    /* The I Score Polygon ***************************************/
    // example const Ipoly = new fabric.Polygon(
    //   [
    //     { x: 0, y: 0 },
    //     { x: 0, y: DI_Yinter }, // I1
    //     { x: ISCORE, y: ISCORE }, // I0
    //     { x: -IS_Xinter, y: 0 }
    //   ],
    //   {
    //     // I2
    //     stroke: "#000",
    //     strokeWidth: 2,
    //     fill: DISC_COLOR_I,
    //     flipX: false,
    //     flipY: true,
    //     opacity: scores.i < 0 ? 0.1 : 0.7
    //   }
    // );
    // debugger;
    // canvas.add(Ipoly.set({ left: left, top })); // Render the I Polygon
    const Ipoly2 = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: 0, y: DI_Yinter }, // I1
        { x: ISCORE, y: ISCORE }, // I0
        { x: -IS_Xinter, y: 0 },
      ],
      {
        // I2
        stroke: '#000',
        strokeWidth: 1,
        fill: DISC_COLOR_I,
        flipX: false,
        flipY: true,
        opacity: scores.i < 0 ? 0.1 : 0.7,
      },
    )
    const iMinusValue = Math.max(Math.abs(DI_Yinter), Math.abs(ISCORE))
    // debugger;
    canvas.add(Ipoly2.set({ left, top: top - iMinusValue - 1 })) // Render the I Polygon
    /* The S Score Polygon ***************************************/
    const Spoly = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: 0, y: CS_Yinter }, // S1
        { x: SSCORE, y: SSCORE }, // S0
        { x: -IS_Xinter, y: 0 },
      ],
      {
        // S2
        stroke: '#000',
        strokeWidth: 1,
        fill: DISC_COLOR_S,
        flipX: false,
        angle: 0,
        flipY: false,
        opacity: scores.s < 0 ? 0.1 : 0.7,
      },
    )
    canvas.add(Spoly.set({ left, top })) // Render the S Polygon
    /* The C1 Score Polygon ***************************************/
    // example const Cpoly = new fabric.Polygon(
    //   [
    //     { x: 0, y: 0 },
    //     { x: 0, y: CD_Xinter }, // C1
    //     { x: CSCORE, y: CSCORE }, // C0
    //     { x: CS_Yinter, y: 0 }
    //   ],
    //   {
    //     stroke: "#000",
    //     strokeWidth: 2,
    //     fill: DISC_COLOR_C,
    //     flipY: false,
    //     flipX: false,
    //     angle: 90,
    //     opacity: scores.c < 0 ? 0.1 : 0.7
    //   }
    // );
    // canvas.add(Cpoly.set({ left, top })); // Render the C Polygon
    const Cpoly = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: 0, y: CD_Xinter }, // C1
        { x: CSCORE, y: CSCORE }, // C0
        { x: CS_Yinter, y: 0 },
      ],
      {
        stroke: '#000',
        strokeWidth: 1,
        fill: DISC_COLOR_C,
        flipY: false,
        flipX: false,
        angle: 90,
        opacity: scores.c < 0 ? 0.1 : 0.7,
      },
    )
    canvas.add(Cpoly.set({ left: left, top })) // Render the C Polygon
    this.setState({
      dPercentStr: `${D}%`,
      iPercentStr: `${I}%`,
      sPercentStr: `${S}%`,
      cPercentStr: `${C}%`,
    })
    requestAnimationFrame(() => {
      this._onCanvasRendered(this.canvas as HTMLCanvasElement)
    })
    /* eslint-enable camelcase */
  }
}

export { DiscGraph, DiscGraphValues }
