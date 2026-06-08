import type { TokenName } from '../schema/tokens'
import type { OklchColor } from '../schema/derivations'
import type { RawTokenValue } from '../schema/raw-values'
import { isRawRef, isRawDimension } from '../schema/raw-values'

export interface ResolveResult {
  values: Record<TokenName, OklchColor>
}

export function resolveRaw(
  raw: Partial<Record<TokenName, RawTokenValue>>,
  fallback: Record<TokenName, OklchColor>,
): ResolveResult {
  const resolved: Partial<Record<TokenName, OklchColor>> = {}
  const visiting = new Set<TokenName>()

  function dfs(name: TokenName): OklchColor | undefined {
    if (resolved[name]) return resolved[name]
    const val = raw[name]
    if (!val) {
      const fb = fallback[name]
      if (fb) resolved[name] = fb
      return fb
    }
    if (!isRawRef(val) && !isRawDimension(val)) {
      resolved[name] = val.value
      return val.value
    } else if (isRawDimension(val)) {
      // ! Update to handle number values- i.e. `border-radius`
      return
    }
    // reference
    if (visiting.has(name)) {
      throw new Error(`Circular reference detected at ${name}`)
    }
    visiting.add(name)
    const targ = dfs(val.target as TokenName)
    visiting.delete(name)
    if (targ) resolved[name] = targ
    return targ
  }

  // resolve all present keys
  for (const key of Object.keys(raw) as TokenName[]) {
    dfs(key)
  }
  // fill fallbacks for any missing values
  for (const [k, v] of Object.entries(fallback) as [TokenName, OklchColor][]) {
    if (!resolved[k]) resolved[k] = v
  }
  return { values: resolved as Record<TokenName, OklchColor> }
}
