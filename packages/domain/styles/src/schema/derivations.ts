import type { TokenName } from './tokens'
import { bestForeground as bestForegroundCulori } from '../color/oklch'

export type Mode = 'light' | 'dark'

// Minimal OKLCH color type for our computations
export interface OklchColor {
  mode: 'oklch'
  l: number
  c: number
  h: number
  alpha?: number
}

export interface DerivationContext {
  mode: Mode
}

export type ComputeFn = (
  refs: Record<TokenName, OklchColor>,
  ctx: DerivationContext,
) => OklchColor

export interface DerivationDef {
  deps: TokenName[]
  compute: ComputeFn
}

export type DerivationMap = Partial<Record<TokenName, DerivationDef>>

// --- lightweight helpers (OKLCH) ---
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export function bestForeground(bg: OklchColor): OklchColor {
  return bestForegroundCulori(bg)
}

export function subtle(
  base: OklchColor,
  mode: Mode,
  amount: number,
): OklchColor {
  // amount ~0..0.3; light mode -> lighter, dark mode -> darker
  const delta = mode === 'light' ? amount : -amount
  return { ...base, l: clamp01(base.l + delta) }
}

export function neutralFor(
  bg: OklchColor,
  mode: Mode,
  amount: number,
): OklchColor {
  // Generate a neutral against bg, offset by amount
  // If bg is light (L > 0.5), make darker variants
  // If bg is dark (L <= 0.5), make lighter variants
  const isLightBg = bg.l > 0.5
  const delta = isLightBg ? -amount : amount
  return { mode: 'oklch', l: clamp01(bg.l + delta), c: 0, h: 0 }
}

export function overlayFor(bg: OklchColor, mode: Mode): OklchColor {
  // Semi-opaque overlay, slightly bias toward darkening in light mode / lightening in dark mode
  const target = mode === 'light' ? 0.0 : 0.98
  const l = bg.l * 0.7 + target * 0.3
  return { mode: 'oklch', l: clamp01(l), c: 0, h: 0, alpha: 0.4 }
}

export function seriesFrom(base: OklchColor): OklchColor[] {
  // Build a 5-color series by small hue rotation and chroma scaling
  const seq: OklchColor[] = []
  for (let i = 0; i < 5; i++) {
    const h = (base.h + (i - 1) * 8 + 360) % 360
    const c = Math.max(0, base.c * (1 - i * 0.13))
    const l = clamp01(base.l + (i - 2) * 0.06)
    seq.push({ mode: 'oklch', l, c, h })
  }
  return seq
}

export function tintNeutralWith(
  neutral: OklchColor,
  tint: OklchColor,
  amount: number,
): OklchColor {
  // Tint a neutral (low/no chroma) color with another color
  // Use the tint's hue directly (don't interpolate from neutral's meaningless hue)
  // Mix lightness and add some of the tint's chroma
  const t = clamp01(amount)
  return {
    mode: 'oklch',
    l: neutral.l + (tint.l - neutral.l) * t,
    c: tint.c * t, // Add a portion of the tint's chroma
    h: tint.h, // Use the tint's hue directly
    alpha: neutral.alpha,
  }
}

// --- derivation registry ---
export const DERIVATIONS: DerivationMap = {
  '--site-fg': {
    deps: ['--site-bg'],
    compute: (r) => bestForeground(r['--site-bg']),
  },

  '--primary-fg': {
    deps: ['--primary'],
    compute: (r) => bestForeground(r['--primary']),
  },
  '--primary-subtle': {
    deps: ['--primary'],
    compute: (r, { mode }) => subtle(r['--primary'], mode, 0.12),
  },
  '--primary-subtle-fg': {
    deps: ['--primary-subtle'],
    compute: (r) => bestForeground(r['--primary-subtle']),
  },

  '--secondary-fg': {
    deps: ['--secondary'],
    compute: (r) => bestForeground(r['--secondary']),
  },

  '--label': {
    deps: ['--site-fg'],
    compute: (r, { mode }) => subtle(r['--site-fg'], mode, 0.12),
  },
  '--title': {
    deps: ['--secondary-fg'],
    compute: (r) => r['--secondary-fg'],
  },
  '--title-2': {
    deps: ['--secondary-fg'],
    compute: (r) => r['--secondary-fg'],
  },
  '--title-3': {
    deps: ['--secondary-fg'],
    compute: (r) => r['--secondary-fg'],
  },
  '--title-4': {
    deps: ['--secondary-fg'],
    compute: (r) => r['--secondary-fg'],
  },
  '--title-5': {
    deps: ['--secondary-fg'],
    compute: (r) => r['--secondary-fg'],
  },
  '--title-6': {
    deps: ['--secondary-fg'],
    compute: (r) => r['--secondary-fg'],
  },

  '--accent': {
    deps: ['--secondary', '--primary'],
    compute: (r) => r['--secondary'] ?? r['--primary'],
  },
  '--accent-fg': {
    deps: ['--accent'],
    compute: (r) => bestForeground(r['--accent']),
  },

  '--muted-fg': {
    deps: ['--muted'],
    compute: (r) => bestForeground(r['--muted']),
  },

  '--overlay': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => overlayFor(r['--site-bg'], mode),
  },
  '--overlay-fg': {
    deps: ['--overlay'],
    compute: (r) => bestForeground(r['--overlay']),
  },

  '--info-fg': {
    deps: ['--info'],
    compute: (r) => bestForeground(r['--info']),
  },
  '--info-subtle': {
    deps: ['--info'],
    compute: (r, { mode }) => subtle(r['--info'], mode, 0.1),
  },
  '--info-subtle-fg': {
    deps: ['--info-subtle'],
    compute: (r) => bestForeground(r['--info-subtle']),
  },

  '--success-fg': {
    deps: ['--success'],
    compute: (r) => bestForeground(r['--success']),
  },
  '--success-subtle': {
    deps: ['--success'],
    compute: (r, { mode }) => subtle(r['--success'], mode, 0.1),
  },
  '--success-subtle-fg': {
    deps: ['--success-subtle'],
    compute: (r) => bestForeground(r['--success-subtle']),
  },

  '--warning-fg': {
    deps: ['--warning'],
    compute: (r) => bestForeground(r['--warning']),
  },
  '--warning-subtle': {
    deps: ['--warning'],
    compute: (r, { mode }) => subtle(r['--warning'], mode, 0.12),
  },
  '--warning-subtle-fg': {
    deps: ['--warning-subtle'],
    compute: (r) => bestForeground(r['--warning-subtle']),
  },

  '--danger-fg': {
    deps: ['--danger'],
    compute: (r) => bestForeground(r['--danger']),
  },
  '--danger-subtle': {
    deps: ['--danger'],
    compute: (r, { mode }) => subtle(r['--danger'], mode, 0.12),
  },
  '--danger-subtle-fg': {
    deps: ['--danger-subtle'],
    compute: (r) => bestForeground(r['--danger-subtle']),
  },

  '--error': {
    deps: ['--danger'],
    compute: (r) => r['--danger'],
  },
  '--error-fg': {
    deps: ['--danger-fg'],
    compute: (r) => r['--danger-fg'],
  },
  '--error-subtle': {
    deps: ['--danger-subtle'],
    compute: (r) => r['--danger-subtle'],
  },
  '--error-subtle-fg': {
    deps: ['--danger-subtle-fg'],
    compute: (r) => r['--danger-subtle-fg'],
  },

  '--border': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.18),
  },
  '--input': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.08),
  },
  '--input-border': {
    deps: ['--border'],
    compute: (r) => r['--border'],
  },
  '--ring': {
    deps: ['--accent', '--secondary', '--primary'],
    compute: (r) => r['--accent'] ?? r['--secondary'] ?? r['--primary'],
  },

  '--chart-1': {
    deps: ['--primary'],
    compute: (r) => seriesFrom(r['--primary'])[0],
  },
  '--chart-2': {
    deps: ['--primary'],
    compute: (r) => seriesFrom(r['--primary'])[1],
  },
  '--chart-3': {
    deps: ['--primary'],
    compute: (r) => seriesFrom(r['--primary'])[2],
  },
  '--chart-4': {
    deps: ['--primary'],
    compute: (r) => seriesFrom(r['--primary'])[3],
  },
  '--chart-5': {
    deps: ['--primary'],
    compute: (r) => seriesFrom(r['--primary'])[4],
  },

  '--topbar-fg': {
    deps: ['--topbar'],
    compute: (r) => bestForeground(r['--topbar']),
  },
  '--topbar-subtle': {
    deps: ['--topbar'],
    compute: (r, { mode }) => subtle(r['--topbar'], mode, 0.06),
  },
  '--topbar-subtle-fg': {
    deps: ['--topbar-subtle'],
    compute: (r) => bestForeground(r['--topbar-subtle']),
  },
  '--topbar-primary': {
    deps: ['--primary'],
    compute: (r) => r['--primary'],
  },
  '--topbar-primary-fg': {
    deps: ['--topbar-primary'],
    compute: (r) => bestForeground(r['--topbar-primary']),
  },

  '--navbar-fg': {
    deps: ['--navbar'],
    compute: (r) => bestForeground(r['--navbar']),
  },
  '--navbar-subtle': {
    deps: ['--navbar'],
    compute: (r, { mode }) => subtle(r['--navbar'], mode, 0.06),
  },
  '--navbar-subtle-fg': {
    deps: ['--navbar-subtle'],
    compute: (r) => bestForeground(r['--navbar-subtle']),
  },

  '--sidebar-fg': {
    deps: ['--sidebar'],
    compute: (r) => bestForeground(r['--sidebar']),
  },
  '--sidebar-subtle': {
    deps: ['--sidebar'],
    compute: (r, { mode }) => subtle(r['--sidebar'], mode, 0.05),
  },
  '--sidebar-subtle-fg': {
    deps: ['--sidebar-subtle'],
    compute: (r) => bestForeground(r['--sidebar-subtle']),
  },

  '--sidebar-item': {
    deps: ['--sidebar'],
    compute: (r) => r['--sidebar'],
  },
  '--sidebar-item-fg': {
    deps: ['--sidebar-fg'],
    compute: (r) => r['--sidebar-fg'],
  },
  '--sidebar-item-subtle': {
    deps: ['--sidebar-subtle'],
    compute: (r) => r['--sidebar-subtle'],
  },
  '--sidebar-item-subtle-fg': {
    deps: ['--sidebar-subtle-fg'],
    compute: (r) => r['--sidebar-subtle-fg'],
  },

  '--homepage': {
    deps: ['--site-bg'],
    compute: (r) => r['--site-bg'],
  },
  '--homepage-fg': {
    deps: ['--homepage'],
    compute: (r) => bestForeground(r['--homepage']),
  },

  '--link-subtle': {
    deps: ['--link'],
    compute: (r, { mode }) => subtle(r['--link'], mode, 0.12),
  },
  '--actiontext': {
    deps: ['--link'],
    compute: (r) => r['--link'],
  },
  '--actiontext-subtle': {
    deps: ['--actiontext'],
    compute: (r, { mode }) => subtle(r['--actiontext'], mode, 0.12),
  },

  '--bg-contrast-low': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.04),
  },
  '--bg-contrast-medium': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.07),
  },
  '--bg-contrast-high': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.11),
  },

  '--list-item-odd': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.02),
  },
  '--list-item-even': {
    deps: ['--site-bg'],
    compute: (r, { mode }) => neutralFor(r['--site-bg'], mode, 0.04),
  },
  '--list-item-odd-selected': {
    deps: ['--list-item-odd', '--primary'],
    compute: (r) => tintNeutralWith(r['--list-item-odd'], r['--primary'], 0.15),
  },
  '--list-item-even-selected': {
    deps: ['--list-item-even', '--primary'],
    compute: (r) =>
      tintNeutralWith(r['--list-item-even'], r['--primary'], 0.15),
  },
}

/**
 * Given a Variable that has dependencies, returns the names of all the variables that *DIRECTLY* depend on it.
 * @example
 * ```ts
 * DERIVATION_SOURCES['--primary'] // ['--primary-fg', '--primary-subtle]
 * ```
 */
export const DERIVATION_SOURCES = (
  Object.entries(DERIVATIONS) as [TokenName, DerivationDef][]
).reduce(
  (accum, [name, def]) => {
    if (def.deps.length > 0) {
      def.deps.forEach((dep) => {
        if (!accum[dep]) {
          accum[dep] = []
        }
        accum[dep].push(name)
      })
    }

    return accum
  },
  {} as Record<TokenName, TokenName[]>,
)

/**
 * Given a Variable, returns whether it is a derived variable. (*Meaning it is calculated when another variable changes*)
 * @example
 * ```ts
 * isDerivedToken('--primary') // false
 * isDerivedToken('--primary-fg') // true
 * isDerivedToken('--primary-subtle') // true
 * ```
 * @returns `true | false`
 */
export function isDerivedToken(name: TokenName): boolean {
  return !!DERIVATIONS[name]?.deps?.length
}

/**
 * Given a Variable, returns whether it is depended on by any other variables.
 * @example
 * ```ts
 * isDependedOnToken('--primary') // true
 * isDerivedToken('--primary-fg') // false
 * isDerivedToken('--primary-subtle') // false
 * ```
 * @returns `true | false`
 */
export function isDependedOnToken(name: TokenName): boolean {
  return !!DERIVATION_SOURCES[name]?.length
}

// Overrides/locks model (used by the evaluation engine later)
export type Locks = Set<TokenName>
export type Overrides = Partial<Record<TokenName, OklchColor>>
