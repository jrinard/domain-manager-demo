/**
 * Renders a heatmap with points for each profile
 */
import React, { Component } from 'react'

import { calculatePoints, drawHeatmap } from './utils'
import type { DiscGraphValuesExtended } from '../discQuadrants/types'
import * as styling from '@falcon/style'

import './vendor'
import './style.scss'

const negativeValue = 20
const labels: {
  label: string
  style: React.CSSProperties
  letterStyle: React.CSSProperties
  type: string
}[] = [
  {
    label: 'Driver',
    style: {
      top: `-${negativeValue}px`,
      left: '0px',
    },
    letterStyle: {
      top: '0px',
      left: '0px',
    },
    type: 'd',
  },
  {
    label: 'Influencer',
    style: {
      top: `-${negativeValue}px`,
      left: '50%',
    },
    letterStyle: {
      top: '0px',
      left: '50%',
    },
    type: 'i',
  },
  {
    label: 'Stabilizer',
    style: {
      bottom: `-${negativeValue}px`,
      left: '50%',
    },
    letterStyle: {
      top: '50%',
      left: '50%',
    },
    type: 's',
  },
  {
    label: 'Analyzer',
    style: {
      bottom: `-${negativeValue}px`,
      left: '0px',
    },
    letterStyle: {
      top: '50%',
      left: '0px',
    },
    type: 'a',
  },
]

function convertFriendlyHeatMapType(type?: Props['heatMapType']): 1 | 2 {
  switch (type) {
    case 'private':
      return 2
    case 'public':
    default:
      return 1
  }
}

interface Props {
  profiles: DiscGraphValuesExtended[]
  heatMapType?: 'public' | 'private'
  size: number
  onUserSelect?: (userID: number) => void
  omitLabels?: boolean
  innerRef?: (
    node: HTMLDivElement | null,
  ) => void | React.MutableRefObject<HTMLDivElement | null>
}

interface State {
  heatMapType: 1 | 2 | 3
}

export default class Heatmap extends Component<Props, State> {
  heatmap?: HTMLDivElement | null

  static defaultProps = {
    size: 300,
  }
  static displayName = 'Heatmap'

  state = {
    heatMapType: convertFriendlyHeatMapType(this.props.heatMapType),
  }

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this._drawHeatmap()
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.heatMapType &&
      prevProps.heatMapType !== this.props.heatMapType
    ) {
      this.setState(
        {
          heatMapType: this.props.heatMapType
            ? convertFriendlyHeatMapType(this.props.heatMapType)
            : this.state.heatMapType,
        },
        () => {
          this._drawHeatmap()
        },
      )
    } else {
      this._drawHeatmap()
    }
  }

  _addHeatmapRef = (n: HTMLDivElement) => {
    this.heatmap = n
  }

  _drawHeatmap() {
    if (this.props.profiles && this.heatmap) {
      drawHeatmap(
        this.props.profiles,
        this.heatmap,
        this.state.heatMapType,
        this.props.size,
      )
    }
  }

  render() {
    if (!this.props.profiles) {
      return null
    }
    const points: {
      model: DiscGraphValuesExtended
      x: number
      y: number
      count: number
      profile: DiscGraphValuesExtended
      quadrant: string
    }[] = calculatePoints(
      this.props.profiles,
      this.state.heatMapType,
      this.props.size,
    )

    const offset = 0
    const labelPadding = this.props.omitLabels ? 0 : 40

    return (
      <div
        className="disc-heatmap-cont"
        style={{ height: this.props.size + labelPadding }}
        ref={this.props.innerRef}
      >
        <div
          className="disc-heatmap-info"
          style={{
            height: this.props.size + labelPadding,
            width: this.props.size,
          }}
        >
          <div
            className="disc-heatmap-points-cont disc-grid-bg has-grid"
            style={{
              height: this.props.size,
              width: this.props.size,
              margin: `${this.props.omitLabels ? 0 : negativeValue}px 0px ${this.props.omitLabels ? 0 : negativeValue}px`,
            }}
          >
            {this.props.omitLabels ? null : (
              <>
                {labels.map(({ label, style, type }) => (
                  <p
                    className={styling.mergeClasses(
                      'disc-heatmap-section-labels',
                      type,
                    )}
                    key={label}
                    style={{
                      ...style,
                    }}
                  >
                    {label}
                  </p>
                ))}
              </>
            )}

            <div
              className="disc-heatmap-points"
              ref={this._addHeatmapRef}
              style={{
                height: this.props.size - offset * 2,
                left: offset,
                top: offset,
                width: this.props.size - offset * 2,
              }}
            >
              {points.map(({ x, y, profile }) => (
                <UserPoint
                  scaleSize={this.props.size}
                  key={profile.personID}
                  onUserSelect={this.props.onUserSelect}
                  heatMapType={this.state.heatMapType}
                  profile={profile}
                  x={x}
                  y={y}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  updateType(heatMapType: 1 | 2) {
    this.setState({
      heatMapType,
    })
  }
}

interface UserPointProps {
  scaleSize: number
  heatMapType: 1 | 2 | 3
  onUserSelect?: (userID: number) => void
  profile: DiscGraphValuesExtended
  x: number
  y: number
}

const UserPoint = ({
  scaleSize,
  heatMapType,
  onUserSelect,
  profile,
  x,
  y,
}: UserPointProps) => {
  const [hovering, updateHovering] = React.useState(false)

  const size = hovering ? scaleSize * 0.1 : scaleSize * 0.0466666666666
  const intials = getInitials(profile.personName || '')

  return (
    <div
      className="disc-heatmap-point-cont"
      key={profile.personID}
      style={{ top: y, left: x, zIndex: hovering ? 100 : undefined }}
      title={profile.personName || ''}
    >
      <button
        className={styling.mergeClasses(
          'disc-heatmap-point-userthumb',
          hovering && 'disc-heatmap-point-userthumb-hovering',
        )}
        type="button"
        data-size={size}
        style={{
          position: 'absolute',
          left: `-${size / 2}px`,
          top: `-${size / 2}px`,
          width: size,
          height: size,
        }}
        title={profile.personName || ''}
        data-testid={profile.personName || ''}
        onClick={() => {
          if (onUserSelect) {
            onUserSelect(profile.personID)
          }
        }}
        onMouseEnter={() => updateHovering(true)}
        onMouseLeave={() => updateHovering(false)}
      >
        <span
          className="disc-heatmap-point-userthumb-initials"
          style={{ fontSize: size / 3, lineHeight: `${size / 3}px` }}
        >
          {intials}
        </span>
      </button>
    </div>
  )
}

function getInitials(userName: string) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('.')

  return initials + '.'
}
