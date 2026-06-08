import type { ParsedStylesheet } from '../format/css'
import type { OklchColor } from '../schema/derivations'
import type { TokenName } from '../schema/tokens'
import type { RawTokenValue } from '../schema/raw-values'
import { buildNeutralSuite, buildGreyscaleScale } from './neutral'
import { GREYSCALE_FAMILIES, type NeutralFamily } from './families'
import { buildPrimarySuite } from './primary'

export interface ThemePresetOptions {
  greyscale: string // family id
  primaryHex: string
  accentHex?: string
}

function color(value: OklchColor): RawTokenValue {
  return { type: 'color', value }
}
function ref(target: TokenName): RawTokenValue {
  return { type: 'ref', target }
}

export function createThemePreset(
  options: ThemePresetOptions,
): ParsedStylesheet {
  const family = GREYSCALE_FAMILIES.find(
    (f) => f.id === options.greyscale,
  ) as NeutralFamily
  const lightNeutral = buildNeutralSuite(family, 'light')
  const darkNeutral = buildNeutralSuite(family, 'dark')
  const lightGrayscale = buildGreyscaleScale(family, 'light')
  const darkGrayscale = buildGreyscaleScale(family, 'dark')
  const lightPrimary = buildPrimarySuite(options.primaryHex, 'light')
  const darkPrimary = buildPrimarySuite(options.primaryHex, 'dark')

  const light: Partial<Record<TokenName, RawTokenValue>> = {}
  const dark: Partial<Record<TokenName, RawTokenValue>> = {}

  // neutrals
  light['--site-bg'] = color(lightNeutral.bg)
  light['--site-fg'] = color(lightNeutral.fg)
  light['--border'] = color(lightNeutral.border)
  light['--input'] = color(lightNeutral.input)
  light['--topbar'] = color(lightNeutral.navbar)
  light['--topbar-fg'] = color(lightNeutral.navbarFg)
  light['--navbar'] = color(lightNeutral.navbar)
  light['--navbar-fg'] = color(lightNeutral.navbarFg)
  light['--sidebar'] = color(lightNeutral.sidebar)
  light['--sidebar-fg'] = color(lightNeutral.sidebarFg)
  light['--list-item-odd'] = color(lightNeutral.listOdd)
  light['--list-item-even'] = color(lightNeutral.listEven)

  dark['--site-bg'] = color(darkNeutral.bg)
  dark['--site-fg'] = color(darkNeutral.fg)
  dark['--border'] = color(darkNeutral.border)
  dark['--input'] = color(darkNeutral.input)
  dark['--topbar'] = color(darkNeutral.navbar)
  dark['--topbar-fg'] = color(darkNeutral.navbarFg)
  dark['--navbar'] = color(darkNeutral.navbar)
  dark['--navbar-fg'] = color(darkNeutral.navbarFg)
  dark['--sidebar'] = color(darkNeutral.sidebar)
  dark['--sidebar-fg'] = color(darkNeutral.sidebarFg)
  dark['--list-item-odd'] = color(darkNeutral.listOdd)
  dark['--list-item-even'] = color(darkNeutral.listEven)

  // grayscale scale (50-950)
  light['--grayscale-50'] = color(lightGrayscale['50'])
  light['--grayscale-100'] = color(lightGrayscale['100'])
  light['--grayscale-200'] = color(lightGrayscale['200'])
  light['--grayscale-300'] = color(lightGrayscale['300'])
  light['--grayscale-400'] = color(lightGrayscale['400'])
  light['--grayscale-500'] = color(lightGrayscale['500'])
  light['--grayscale-600'] = color(lightGrayscale['600'])
  light['--grayscale-700'] = color(lightGrayscale['700'])
  light['--grayscale-800'] = color(lightGrayscale['800'])
  light['--grayscale-900'] = color(lightGrayscale['900'])
  light['--grayscale-950'] = color(lightGrayscale['950'])

  dark['--grayscale-50'] = color(darkGrayscale['50'])
  dark['--grayscale-100'] = color(darkGrayscale['100'])
  dark['--grayscale-200'] = color(darkGrayscale['200'])
  dark['--grayscale-300'] = color(darkGrayscale['300'])
  dark['--grayscale-400'] = color(darkGrayscale['400'])
  dark['--grayscale-500'] = color(darkGrayscale['500'])
  dark['--grayscale-600'] = color(darkGrayscale['600'])
  dark['--grayscale-700'] = color(darkGrayscale['700'])
  dark['--grayscale-800'] = color(darkGrayscale['800'])
  dark['--grayscale-900'] = color(darkGrayscale['900'])
  dark['--grayscale-950'] = color(darkGrayscale['950'])

  // primary
  light['--primary'] = color(lightPrimary.primary)
  light['--primary-fg'] = color(lightPrimary.primaryFg)
  light['--primary-subtle'] = color(lightPrimary.primarySubtle)
  light['--primary-subtle-fg'] = color(lightPrimary.primarySubtleFg)
  light['--chart-1'] = color(lightPrimary.charts[0])
  light['--chart-2'] = color(lightPrimary.charts[1])
  light['--chart-3'] = color(lightPrimary.charts[2])
  light['--chart-4'] = color(lightPrimary.charts[3])
  light['--chart-5'] = color(lightPrimary.charts[4])

  dark['--primary'] = color(darkPrimary.primary)
  dark['--primary-fg'] = color(darkPrimary.primaryFg)
  dark['--primary-subtle'] = color(darkPrimary.primarySubtle)
  dark['--primary-subtle-fg'] = color(darkPrimary.primarySubtleFg)
  dark['--chart-1'] = color(darkPrimary.charts[0])
  dark['--chart-2'] = color(darkPrimary.charts[1])
  dark['--chart-3'] = color(darkPrimary.charts[2])
  dark['--chart-4'] = color(darkPrimary.charts[3])
  dark['--chart-5'] = color(darkPrimary.charts[4])

  // secondary/accent defaults
  light['--secondary'] = ref('--bg-contrast-high')
  light['--secondary-fg'] = ref('--site-fg')
  light['--accent'] = ref('--secondary')
  light['--accent-fg'] = ref('--secondary-fg')
  dark['--secondary'] = ref('--bg-contrast-high')
  dark['--secondary-fg'] = ref('--site-fg')
  dark['--accent'] = ref('--secondary')
  dark['--accent-fg'] = ref('--secondary-fg')

  light['--bg-contrast-low'] = color(lightNeutral.bgContrastLow)
  light['--bg-contrast-medium'] = color(lightNeutral.bgContrastMedium)
  light['--bg-contrast-high'] = color(lightNeutral.bgContrastHigh)
  dark['--bg-contrast-low'] = color(darkNeutral.bgContrastLow)
  dark['--bg-contrast-medium'] = color(darkNeutral.bgContrastMedium)
  dark['--bg-contrast-high'] = color(darkNeutral.bgContrastHigh)

  // status (keep defaults or mild ties)
  // could map success/warning/danger here if desired

  return {
    light,
    dark,
    locks: new Set(),
    meta: { version: 'v1' },
  }
}

export const greyscaleFamilies = GREYSCALE_FAMILIES.map((f) => ({
  id: f.id,
  label: f.label,
}))
