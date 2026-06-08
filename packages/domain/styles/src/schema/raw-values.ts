import type { TokenName } from './tokens'
import type { OklchColor } from './derivations'

export type RawRef = { type: 'ref'; target: TokenName }
export type RawColor = { type: 'color'; value: OklchColor }
export type RawDimension = { type: 'dimension'; value: string }
export type RawTokenValue = RawRef | RawColor | RawDimension

export function isRawRef(v?: RawTokenValue): v is RawRef {
  return v?.type === 'ref'
}

export function isRawColor(v: RawTokenValue): v is RawColor {
  return v.type === 'color'
}

export function isRawDimension(v: RawTokenValue): v is RawDimension {
  return v.type === 'dimension'
}

export function valueIsSizeUnit(value: string) {
  /**
   * Matches "1.25rem", "0.5rem", ".25px"
   * Does NOT Match "1.25", "0.5", ".25", "oklch(1 1 0)"
   */
  return /^-?\d*\.?\d+(rem|em|px)$/i.test(`${value}`)
}
