import { converter, parse } from 'culori'
import type { OklchColor } from '../schema/derivations'

// Culori converters
const toOklch = converter('oklch')
const toRgb = converter('rgb')

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export function toOklchColor(input: string | OklchColor): OklchColor {
  if (typeof input !== 'string') return input
  const parsed = parse(input)
  if (!parsed) throw new Error(`Invalid color: ${input}`)
  const o = toOklch(parsed) as any
  // Ensure full OklchColor shape
  return {
    mode: 'oklch',
    l: typeof o.l === 'number' ? o.l : 0,
    c: typeof o.c === 'number' ? o.c : 0,
    h: typeof o.h === 'number' ? o.h : 0,
    alpha: typeof o.alpha === 'number' ? o.alpha : undefined,
  }
}

export function formatOklchCss(color: OklchColor): string {
  const l = round(color.l, 3)
  const c = round(color.c, 3)
  const h = roundHue(color.h)
  if (color.alpha === undefined || color.alpha >= 1) {
    return `oklch(${l} ${c} ${h})`
  }
  const a = round(color.alpha, 3)
  return `oklch(${l} ${c} ${h} / ${a})`
}

export function formatRgbCss(color: OklchColor): string {
  const rgb = toRgb(color) as any as {
    r: number
    g: number
    b: number
    alpha?: number
  }
  
  const r = Math.round(clamp01(rgb.r) * 255)
  const g = Math.round(clamp01(rgb.g) * 255)
  const b = Math.round(clamp01(rgb.b) * 255)
  
  if (rgb.alpha === undefined || rgb.alpha >= 1) {
    return `rgb(${r}, ${g}, ${b})`
  }
  const a = round(rgb.alpha, 3)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * Convert an OKLCH color to a hexadecimal CSS string.
 * This is useful for email templates where OKLCH is not supported.
 * Out-of-gamut colors are clamped to sRGB.
 */
export function formatHexCss(color: OklchColor): string {
  const rgb = toRgb(color) as any as {
    r: number
    g: number
    b: number
    alpha?: number
  }
  
  // Clamp to sRGB gamut and convert to 0-255 range
  const r = Math.round(clamp01(rgb.r) * 255)
  const g = Math.round(clamp01(rgb.g) * 255)
  const b = Math.round(clamp01(rgb.b) * 255)
  
  // Convert to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function formatCSSVariable(variable: string): string {
  if (variable.startsWith('--')) {
    return `var(${variable})`
  }
  // TODO: Check if it is not formatted as `var(...)` and error or something?

  return variable
}

function round(n: number, p: number): number {
  const f = Math.pow(10, p)
  return Math.round(n * f) / f
}

function roundHue(h: number): number {
  // Normalize to 0..360 and round to 3 decimals
  const norm = ((h % 360) + 360) % 360
  return round(norm, 3)
}

export function lighten(color: OklchColor, amount: number): OklchColor {
  return { ...color, l: clamp01(color.l + Math.abs(amount)) }
}

export function darken(color: OklchColor, amount: number): OklchColor {
  return { ...color, l: clamp01(color.l - Math.abs(amount)) }
}

export function setAlpha(color: OklchColor, alpha: number): OklchColor {
  return { ...color, alpha: clamp01(alpha) }
}

export function mixOklch(a: OklchColor, b: OklchColor, t: number): OklchColor {
  const tt = clamp01(t)
  // Shortest-arc hue interpolation
  const hDelta = shortestHueDelta(a.h, b.h)
  const h = a.h + hDelta * tt
  return {
    mode: 'oklch',
    l: a.l + (b.l - a.l) * tt,
    c: a.c + (b.c - a.c) * tt,
    h,
    alpha: mixAlpha(a.alpha, b.alpha, tt),
  }
}

function shortestHueDelta(a: number, b: number): number {
  let d = ((b - a + 540) % 360) - 180
  if (d < -180) d += 360
  return d
}

function mixAlpha(
  a: number | undefined,
  b: number | undefined,
  t: number,
): number | undefined {
  if (a === undefined && b === undefined) return undefined
  const aa = a ?? 1
  const bb = b ?? 1
  return aa + (bb - aa) * t
}

// WCAG relative luminance and contrast ratio in sRGB space
export function contrastRatio(a: OklchColor, b: OklchColor): number {
  const ar = toRgb(a) as any as {
    r: number
    g: number
    b: number
    alpha?: number
  }
  const br = toRgb(b) as any as {
    r: number
    g: number
    b: number
    alpha?: number
  }
  const L1 = relativeLuminance(ar)
  const L2 = relativeLuminance(br)
  const lighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (lighter + 0.05) / (darker + 0.05)
}

function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  // rgb expected in 0..1
  const RsRGB = rgb.r
  const GsRGB = rgb.g
  const BsRGB = rgb.b
  const R =
    RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4)
  const G =
    GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4)
  const B =
    BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export function bestForeground(bg: OklchColor): OklchColor {
  const black: OklchColor = { mode: 'oklch', l: 0.14, c: 0.005, h: 285.8 }
  const white: OklchColor = { mode: 'oklch', l: 0.985, c: 0, h: 0 }
  const cBlack = contrastRatio(bg, black)
  const cWhite = contrastRatio(bg, white)
  return cBlack >= cWhite ? black : white
}
