import type { Mode, OklchColor } from '../schema/derivations'
import { bestForeground } from '../schema/derivations'
import { neutralFrom, type NeutralFamily } from './families'

export interface NeutralSuite {
  bg: OklchColor
  fg: OklchColor
  border: OklchColor
  input: OklchColor
  navbar: OklchColor
  navbarFg: OklchColor
  sidebar: OklchColor
  sidebarFg: OklchColor
  listOdd: OklchColor
  listEven: OklchColor
  bgContrastLow: OklchColor
  bgContrastMedium: OklchColor
  bgContrastHigh: OklchColor
}

export function buildNeutralSuite(
  family: NeutralFamily,
  mode: Mode,
): NeutralSuite {
  const anchors =
    mode === 'dark' && family.anchorsDark ? family.anchorsDark : family.anchors
  const bg = neutralFrom(family, mode, anchors.bg)
  const fg = bestForeground(bg)
  const border = neutralFrom(family, mode, anchors.border)
  const input = neutralFrom(family, mode, anchors.input)
  const navbar = neutralFrom(family, mode, anchors.navbar)
  const navbarFg = bestForeground(navbar)
  const sidebar = neutralFrom(family, mode, anchors.sidebar)
  const sidebarFg = bestForeground(sidebar)
  const listOdd = neutralFrom(family, mode, anchors.listOdd)
  const listEven = neutralFrom(family, mode, anchors.listEven)
  const bgContrastLow = neutralFrom(family, mode, anchors.bgContrastLow)
  const bgContrastMedium = neutralFrom(family, mode, anchors.bgContrastMedium)
  const bgContrastHigh = neutralFrom(family, mode, anchors.bgContrastHigh)

  return {
    bg,
    fg,
    border,
    input,
    navbar,
    navbarFg,
    sidebar,
    sidebarFg,
    listOdd,
    listEven,
    bgContrastLow,
    bgContrastMedium,
    bgContrastHigh,
  }
}

/**
 * Standard Tailwind grayscale lightness scale
 */
const GRAYSCALE_LIGHTNESS = {
  50: 0.985,
  100: 0.97,
  200: 0.922,
  300: 0.87,
  400: 0.708,
  500: 0.556,
  600: 0.439,
  700: 0.371,
  800: 0.269,
  900: 0.205,
  950: 0.145,
} as const

export type GreyscaleScale = Record<
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950',
  OklchColor
>

/**
 * Build a complete grayscale scale (50-950) for a given neutral family
 */
export function buildGreyscaleScale(
  family: NeutralFamily,
  mode: Mode,
): GreyscaleScale {
  const scale: Record<string, OklchColor> = {}

  for (const [key, lightness] of Object.entries(GRAYSCALE_LIGHTNESS)) {
    scale[key] = neutralFrom(family, mode, lightness)
  }

  return scale as GreyscaleScale
}
