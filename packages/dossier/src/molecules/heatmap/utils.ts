import type { DiscGraphValuesExtended } from '../discQuadrants/types'

import './vendor/'

export const DEFAULT_GRADIENTS = {
  0.45: 'rgb(0,0,255)',
  0.55: 'rgb(0,255,255)',
  0.65: 'rgb(0,255,0)',
  0.95: 'yellow',
  1.0: 'rgb(255,0,0)',
}

const __r3HMIntensity = 0.04
const __r3HMRadius = 0.05

// // @ts-ignore
let R3heatmap: object | undefined

function findQuadrant(x: number, y: number, breakPoint: number): string {
  if (x > breakPoint) {
    return y > breakPoint ? 'S' : 'I'
  }

  return y > breakPoint ? 'C' : 'D'
}

// calculate x and y coords for a user's r3 scores
/**
 * @param {Number} scoreType DISC scores have 3 possible values. By default, 3 is the standard score displayed. 1 is the stress score.
 */
export function calculatePoints(
  profiles: DiscGraphValuesExtended[],
  scoreType = 3,
  size = 300,
): {
  model: DiscGraphValuesExtended
  x: number
  y: number
  count: number
  profile: DiscGraphValuesExtended
  quadrant: string
}[] {
  const reduceFn = (acumm: number, score: number) => acumm + (score > 0 ? 1 : 0)
  const sizeOffset = profiles.length * 0.01
  const maxScore = size / 6
  const halfMaxScore = maxScore / 2
  const scale = maxScore / 8

  const allProfiles = profiles
    .map((profile) => {
      const scores = [
        // bound scores by [0,8]
        Math.max(
          Math.min(profile[('d' + scoreType) as 'd1' | 'd2' | 'd3'], 8),
          0,
        ),
        Math.max(
          Math.min(profile[('i' + scoreType) as 'i1' | 'i2' | 'i3'], 8),
          0,
        ),
        Math.max(
          Math.min(profile[('s' + scoreType) as 's1' | 's2' | 's3'], 8),
          0,
        ),
        Math.max(
          Math.min(profile[('c' + scoreType) as 'c1' | 'c2' | 'c3'], 8),
          0,
        ),
      ]

      // Convert scale of 0 to 50, treat the scores as vectors (more or less analogous to point coords in this case)
      // thus D will have a negative X, positive Y and so on..
      const D = scores[0] * scale
      const dVec = [-D, D]
      const I = scores[1] * scale
      const iVec = [I, I]
      const S = scores[2] * scale
      const sVec = [S, -S]
      const C = scores[3] * scale
      const cVec = [-C, -C]

      const numVecs = scores.reduce(reduceFn, 0) // count of vectors with non-zero score
      let posXAvg = iVec[0] + sVec[0]
      let negYAvg = sVec[1] + cVec[1]
      let posYAvg = dVec[1] + iVec[1]
      let negXAvg = dVec[0] + cVec[0]

      // this is ugly but more or less works
      // note due to the heat map we can't treat the resultant x,y coords as ([-50, 50], [-50, 50]) because the origin is the top left
      // solve by case, 1/2/3 positive DISC score(s)
      // case 1: the one vector is the heat map point, already correct because all other vectors are zero
      // case 2: either vectors are in opposite quadrant, in which case there is no need to average,
      //			or they are in adjacent quadrants in which case one value will need to be averaged between them
      //			(eg they are both have positive x-values => average their xs s.t. x doesn't escape the heatmap bounds)
      // case 3: all good, just average the vectors.
      switch (numVecs) {
        case 2:
          // check if they are in adjacent quadrants
          if (
            !(
              (scores[0] > 0 && scores[2] > 0) ||
              (scores[1] > 0 && scores[3] > 0)
            )
          ) {
            if (scores[0] > 0 && scores[1] > 0) {
              // two vectors are in D & I quadrants
              posYAvg /= 2
            } else if (scores[1] > 0 && scores[2] > 0) {
              // two vectors are in I & S quadrants
              posXAvg /= 2
            } else if (scores[2] > 0 && scores[3] > 0) {
              // two vectors are in S & C quadrants
              negYAvg /= 2
            } else {
              // two vectors are in C & D quadrants
              negXAvg /= 2
            }
          }
          break
        case 3:
          posXAvg /= 2
          negYAvg /= 2
          posYAvg /= 2
          negXAvg /= 2
          break
      }

      // account for the fact the top left is the origin
      const x = (maxScore + (negXAvg + posXAvg)) / 2
      const y = (maxScore - (negYAvg + posYAvg)) / 2

      // quick NaN check
      if (x == x && y == y) {
        const quadrant = findQuadrant(x, y, halfMaxScore)
        const xCount = Math.abs(x - halfMaxScore) / 6
        const yCount = Math.abs(y - halfMaxScore) / 6
        const count = size / 100 + xCount + yCount - sizeOffset
        return {
          model: profile,
          x: x * 5.5,
          y: y * 5.5,
          count,
          profile,
          quadrant,
        }
      }
    })
    .filter(Boolean)

  return allProfiles as {
    model: DiscGraphValuesExtended
    x: number
    y: number
    count: number
    profile: DiscGraphValuesExtended
    quadrant: string
  }[]
}

export function drawHeatmap(
  profiles: DiscGraphValuesExtended[] = [],
  element: HTMLElement,
  scoreType = 1,
  size = 300,
) {
  // @ts-expect-error - heatmapFactory is defined in vendor file using `var`
  if (typeof heatmapFactory != 'undefined') {
    const data = calculatePoints(profiles, scoreType, size)
    const max = size / 30 + data.length * __r3HMIntensity

    const rad = Math.max(
      size / 6.75 - data.length * __r3HMRadius,
      size / 6.75 / 2,
    )

    const config = {
      radius: Math.max(
        size / 6.75 - data.length * __r3HMRadius,
        size / (6.75 * 2),
      ),
      // radius: Math.max(40 - data.length * __r3HMRadius, size / 15),
      // radius: Math.max(40 - data.length * __r3HMRadius, 20), // * Original
      visible: true,
      opacity: 100,
      offset: undefined,
      gradient: {
        ...DEFAULT_GRADIENTS,
        // * As White
        // 0.15: "rgba(255,255,255,0.25)",
        // 0.45: "rgba(255,255,255,0.75)",
        // 0.55: "rgba(255,255,255,1)",
        // 0.65: "rgba(255,255,255,1)",
        // 0.95: "rgba(255,255,255,1)",
        // 1.0: "rgba(255,255,255,1)"
        // * As DISC Colors
        // 0.45: "rgb(16,115,199)",
        // 0.55: "rgb(31,151,212)",
        // 0.65: "rgb(13,119,70)",
        // 0.95: "rgb(248,154,48)",
        // 1.0: "rgb(143,54,136)"
      },
      element,
    }

    // // @ts-ignore
    if (
      R3heatmap &&
      'clear' in R3heatmap &&
      typeof R3heatmap.clear === 'function'
    ) {
      // // @ts-ignore
      R3heatmap.clear()
    }

    // @ts-expect-error - heatmapFactory is defined in vendor file using `var`
    R3heatmap = heatmapFactory.create(config)
    // @ts-expect-error - heatmapFactory is defined in vendor file using `var`
    R3heatmap.store.setDataSet({ max, data })
  }
}
