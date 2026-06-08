import { HeatmapProps } from '@spacedock/dossier'
import _ from 'lodash'

export function calcGroupStyle(discMiniProfile: HeatmapProps['discValues']) {
  const discValuesAsObj = calcSqrPositiveGroupStyleAsObj(discMiniProfile)

  return _.orderBy(
    [
      { label: 'D', value: discValuesAsObj.d },
      { label: 'I', value: discValuesAsObj.i },
      { label: 'S', value: discValuesAsObj.s },
      { label: 'C', value: discValuesAsObj.c },
    ],
    ['value'],
    ['desc'],
  )
}

const defaultDISCValue = {
  d: 0,
  i: 0,
  s: 0,
  c: 0,
}

export function calcSqrPositiveGroupStyleAsObj(
  discMiniProfile: HeatmapProps['discValues'],
) {
  if (!Array.isArray(discMiniProfile)) {
    return defaultDISCValue
  }

  if (!discMiniProfile.length) {
    return defaultDISCValue
  }

  const letterSums = discMiniProfile.reduce(
    (accum: { d: number; i: number; s: number; c: number }, profile) => ({
      d: accum.d + (profile.d3 > 0 ? Math.pow(profile.d3, 2) : 0),
      i: accum.i + (profile.i3 > 0 ? Math.pow(profile.i3, 2) : 0),
      s: accum.s + (profile.s3 > 0 ? Math.pow(profile.s3, 2) : 0),
      c: accum.c + (profile.c3 > 0 ? Math.pow(profile.c3, 2) : 0),
    }),
    {
      d: 0,
      i: 0,
      s: 0,
      c: 0,
    },
  )

  return {
    d: letterSums.d / discMiniProfile.length,
    i: letterSums.i / discMiniProfile.length,
    s: letterSums.s / discMiniProfile.length,
    c: letterSums.c / discMiniProfile.length,
  }
}

export function getGroupStyleWithStdDeviation(
  disc: { label: string; value: number }[],
) {
  if (!Array.isArray(disc) || !disc.length) {
    return ''
  }

  const values = disc.map((info) => info.value)
  const stdDeviation = calcStandardDeviation(values)

  const highestValue = _.orderBy(disc, ['value'], ['desc'])[0].value
  const lowestAcceptedValue = highestValue - stdDeviation

  const key = disc
    .filter((info) => info.value >= lowestAcceptedValue)
    .map((info) => info.label)
    .join('')

  return key
}

export function calcStandardDeviation(values: number[]) {
  const m = calcMean(values)

  return Math.sqrt(
    values.reduce((sq, n) => {
      return sq + Math.pow(n - m, 2)
    }, 0) /
      (values.length - 1),
  )
}

function calcMean(values: number[]) {
  return values.reduce((total, number) => total + number, 0) / values.length
}
