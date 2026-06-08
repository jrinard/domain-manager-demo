import postcss, { type Rule, type Comment } from 'postcss'
import { TOKEN_DEFS, type TokenName, isTokenName } from '../schema/tokens'
import { toOklchColor, formatRgbCss } from '../color/oklch'
import type { RawTokenValue } from '../schema/raw-values'
import {
  isRawRef,
  isRawColor,
  isRawDimension,
  valueIsSizeUnit,
} from '../schema/raw-values'

export interface ParseOptions {
  darkSelectors?: string[]
  lightSelectors?: string[]
}

export interface ParsedStylesheet {
  light: Partial<Record<TokenName, RawTokenValue>>
  dark: Partial<Record<TokenName, RawTokenValue>>
  locks: Set<TokenName>
  meta?: { version?: string }
}

const DEFAULT_LIGHT_SELECTORS = [':root', "[data-sitetheme='light']"]
const DEFAULT_DARK_SELECTORS = [
  "[data-sitetheme='dark']",
  '.dark',
  '[data-theme="dark"]',
]

const HEADER_MARK = '@domain/styles'

export function parseStylesheet(
  cssText: string,
  options?: ParseOptions,
): ParsedStylesheet {
  const lightSelectors = options?.lightSelectors ?? DEFAULT_LIGHT_SELECTORS
  const darkSelectors = options?.darkSelectors ?? DEFAULT_DARK_SELECTORS

  const root = postcss.parse(cssText)
  const light: Partial<Record<TokenName, RawTokenValue>> = {}
  const dark: Partial<Record<TokenName, RawTokenValue>> = {}
  const locks = new Set<TokenName>()
  const meta: ParsedStylesheet['meta'] = {}

  // Parse header for metadata
  for (const node of root.nodes || []) {
    if (node.type === 'comment') {
      const c = node as Comment
      if (c.text.includes(HEADER_MARK)) {
        const vMatch = c.text.match(/v(\d+)/i)
        if (vMatch) meta.version = `v${vMatch[1]}`
        const locksMatch = c.text.match(/locks\s*=\s*([^|*\n]+)/i)
        if (locksMatch) {
          const list = locksMatch[1]
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          for (const n of list) if (isTokenName(n)) locks.add(n)
        }
        break
      }
    }
  }

  // Collect rules
  for (const node of root.nodes || []) {
    if (node.type !== 'rule') continue
    const rule = node as Rule
    const sel = rule.selector
    const bucket = isDarkSelector(sel, darkSelectors)
      ? dark
      : isLightSelector(sel, lightSelectors)
        ? light
        : undefined
    if (!bucket) continue
    for (const decl of rule.nodes || []) {
      if (decl.type !== 'decl') continue
      if (!decl.prop.startsWith('--')) continue
      const name = decl.prop as TokenName
      if (!isTokenName(name)) continue
      const value = decl.value
      // Support var(--token) reference
      const refMatch = value.match(/^var\((--[a-z0-9-]+)\)$/i)
      if (refMatch && isTokenName(refMatch[1])) {
        bucket[name] = { type: 'ref', target: refMatch[1] }
      } else {
        try {
          if (valueIsSizeUnit(value)) {
            bucket[name] = { type: 'dimension', value }
          } else {
            const ok = toOklchColor(value)
            bucket[name] = { type: 'color', value: ok }
          }
        } catch {
          // If not a color, treat as dimension (e.g., border-radius)
          bucket[name] = { type: 'dimension', value }
        }
      }
    }
  }

  return { light, dark, locks, meta }
}

function isLightSelector(selector: string, allowed: string[]): boolean {
  return allowed.some((s) => selector.includes(s))
}
function isDarkSelector(selector: string, allowed: string[]): boolean {
  return allowed.some((s) => selector.includes(s))
}

export interface SerializeOptions {
  version?: string
  lightSelector?: string
  darkSelector?: string
  locks?: Set<TokenName>
}

export function serializeStylesheet(
  light: Partial<Record<TokenName, RawTokenValue>>,
  dark: Partial<Record<TokenName, RawTokenValue>>,
  options?: SerializeOptions,
): string {
  const lightSelector =
    options?.lightSelector ?? DEFAULT_LIGHT_SELECTORS.join(', ')
  const darkSelector = options?.darkSelector ?? DEFAULT_DARK_SELECTORS[0]
  const locks = options?.locks ?? new Set<TokenName>()
  const version = options?.version ?? 'v1'

  const header = `/* ${HEADER_MARK} ${version} • generated ${new Date().toISOString()} | locks=${[...locks].join(',')} */`

  const order = Object.keys(TOKEN_DEFS) as TokenName[]
  const stringify = (map: Partial<Record<TokenName, RawTokenValue>>) =>
    order
      .filter((n) => map[n] !== undefined)
      .map((n) => {
        const v = map[n]
        if (!v) return ''
        if (isRawRef(v)) {
          return `  ${n}: var(${v.target});`
        } else if (isRawColor(v)) {
          return `  ${n}: ${formatRgbCss(v.value)};`
        } else if (isRawDimension(v)) {
          return `  ${n}: ${v.value};`
        }
        return ''
      })
      .join('\n')

  return [
    header,
    `${lightSelector} {`,
    stringify(light),
    `}`,
    '',
    `${darkSelector} {`,
    stringify(dark),
    `}`,
    '',
  ].join('\n')
}
