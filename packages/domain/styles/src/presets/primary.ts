import { toOklchColor } from '../color/oklch'
import type { OklchColor, Mode } from '../schema/derivations'
import { bestForeground, subtle, seriesFrom } from '../schema/derivations'

export interface PrimarySuite {
  primary: OklchColor
  primaryFg: OklchColor
  primarySubtle: OklchColor
  primarySubtleFg: OklchColor
  charts: OklchColor[]
}

export function buildPrimarySuite(hex: string, mode: Mode): PrimarySuite {
  const base = toOklchColor(hex)
  const primary = base
  const primaryFg = bestForeground(primary)
  const primarySubtle = subtle(primary, mode, 0.12)
  const primarySubtleFg = bestForeground(primarySubtle)
  const charts = seriesFrom(primary)
  return { primary, primaryFg, primarySubtle, primarySubtleFg, charts }
}
