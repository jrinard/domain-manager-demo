import { useCallback, useEffect, useState } from 'react'
import type { ParsedStylesheet } from '../format/css'
import type { Mode, OklchColor } from '../schema/derivations'
import { toOklchColor } from '../color/oklch'
import type { TokenName } from '../schema/tokens'
import { isTokenName } from '../schema/tokens'
import { resolveRaw } from '../engine/resolve'
import type { RawTokenValue } from '../schema/raw-values'
import { DERIVATIONS } from '../schema/derivations'
import { isRawRef } from '../schema/raw-values'
import { parseStylesheet } from '../format/css'
import defaultCss from '../constants/default.css?inline'

export interface UpdateResult {
  ok: boolean
  error?: string
}

export function useEditableStylesheet(initial: ParsedStylesheet) {
  const [sheet, setSheet] = useState<ParsedStylesheet>(initial)

  // keep state in sync if caller provides a different initial
  useEffect(() => {
    setSheet(initial)
  }, [initial])

  // Build adjacency map dep -> [derived]
  const getAdjacency = useCallback(() => {
    const adj = new Map<TokenName, TokenName[]>()
    for (const [name, def] of Object.entries(DERIVATIONS) as [
      TokenName,
      { deps: TokenName[] },
    ][]) {
      for (const d of def.deps || []) {
        if (!adj.has(d)) adj.set(d, [])
        const arr = adj.get(d)
        if (arr) arr.push(name)
      }
    }
    return adj
  }, [])

  const topoFrom = useCallback(
    (start: TokenName): TokenName[] => {
      const adj = getAdjacency()
      const visited = new Set<TokenName>()
      const order: TokenName[] = []
      const queue: TokenName[] = []
      const initialDeps = adj.get(start)
      if (initialDeps && initialDeps.length) queue.push(...initialDeps)
      while (queue.length) {
        const n = queue.shift() as TokenName
        if (visited.has(n)) continue
        visited.add(n)
        order.push(n)
        const next = adj.get(n)
        if (next && next.length) queue.push(...next)
      }
      return order
    },
    [getAdjacency],
  )

  const setColor = useCallback(
    (
      mode: Mode,
      name: string,
      value: string | { l: number; c: number; h: number; alpha?: number },
    ): UpdateResult => {
      if (!isTokenName(name))
        return { ok: false, error: `Unknown token ${name}` }
      try {
        setSheet((prev) => {
          // Clone
          const next: ParsedStylesheet = {
            ...prev,
            light: { ...prev.light },
            dark: { ...prev.dark },
          }
          const bucket = mode === 'light' ? next.light : next.dark

          // Resolve var(--x) if provided as value
          let newColor: OklchColor
          if (typeof value === 'string') {
            const m = value.match(/^var\((--[a-z0-9-]+)\)$/i)
            if (m && isTokenName(m[1])) {
              const resolved = resolveRaw(
                bucket as Partial<Record<TokenName, RawTokenValue>>,
                {} as Record<TokenName, OklchColor>,
              ).values
              const refVal = resolved[m[1] as TokenName]
              if (!refVal) throw new Error('Reference not resolvable')
              newColor = refVal
            } else {
              newColor = toOklchColor(value)
            }
          } else {
            newColor = toOklchColor({ mode: 'oklch', ...value })
          }

          // Set the base token
          bucket[name as TokenName] = { type: 'color', value: newColor }

          // * If the token depends on another token, lock it since it is being manually updated right now
          if (DERIVATIONS[name]?.deps?.length) {
            next.locks = new Set([...next.locks, name])
          }

          // Build current numeric map from raw, seeded with new base
          const current = resolveRaw(
            bucket as Partial<Record<TokenName, RawTokenValue>>,
            {} as Record<TokenName, OklchColor>,
          ).values
          current[name as TokenName] = newColor

          // Recompute affected derived tokens in order, respecting locks and refs
          const affected = topoFrom(name as TokenName)
          for (const t of affected) {
            const def = (
              DERIVATIONS as Record<
                string,
                {
                  deps: TokenName[]
                  compute: (
                    r: Record<TokenName, OklchColor>,
                    ctx: { mode: Mode },
                  ) => OklchColor
                }
              >
            )[t]
            if (!def) continue
            // Respect locks
            if (next.locks.has(t)) continue
            // Respect explicit refs
            const rawT = bucket[t]
            if (rawT && isRawRef(rawT)) continue
            // Compute if all deps present in current
            const deps = def.deps || []
            if (!deps.every((d) => current[d] !== undefined)) continue
            const refs: Record<TokenName, OklchColor> = {} as Record<
              TokenName,
              OklchColor
            >
            for (const d of deps) refs[d] = current[d] as OklchColor
            const computed = def.compute(refs, { mode })
            current[t] = computed
            bucket[t] = { type: 'color', value: computed }
          }
          return next
        })
        return { ok: true }
      } catch (e) {
        return { ok: false, error: 'Invalid color value' }
      }
    },
    [topoFrom],
  )

  const setRef = useCallback(
    (mode: Mode, name: string, target: string): UpdateResult => {
      if (!isTokenName(name))
        return { ok: false, error: `Unknown token ${name}` }
      if (!isTokenName(target))
        return { ok: false, error: `Unknown token ${target}` }

      // Propose update, then validate no cycles
      let error: string | undefined
      setSheet((prev) => {
        const next: ParsedStylesheet = {
          ...prev,
          light: { ...prev.light },
          dark: { ...prev.dark },
        }
        const bucket = mode === 'light' ? next.light : next.dark
        bucket[name as TokenName] = { type: 'ref', target: target as TokenName }

        // cycle detection within this theme bucket
        try {
          const rawBucket = bucket as Partial<Record<TokenName, RawTokenValue>>
          const emptyFallback = {} as Record<TokenName, OklchColor>
          resolveRaw(rawBucket, emptyFallback)
        } catch {
          error = 'Circular reference detected'
          return prev // abort update
        }
        return next
      })
      return error ? { ok: false, error } : { ok: true }
    },
    [],
  )

  const removeValue = useCallback((mode: Mode, name: string): UpdateResult => {
    if (!isTokenName(name)) return { ok: false, error: `Unknown token ${name}` }
    setSheet((prev) => {
      const next: ParsedStylesheet = {
        ...prev,
        light: { ...prev.light },
        dark: { ...prev.dark },
      }
      const bucket = mode === 'light' ? next.light : next.dark
      delete bucket[name as TokenName]
      return next
    })
    return { ok: true }
  }, [])

  const toggleValueLock = useCallback((mode: Mode, name: string) => {
    if (!isTokenName(name)) {
      return { ok: false, error: `Unknown token ${name}` }
    }

    setSheet((prev) => {
      const next: ParsedStylesheet = { ...prev }

      if (!DERIVATIONS[name]?.deps?.length) {
        return prev
      }

      next.locks = new Set(prev.locks)

      if (prev.locks.has(name)) {
        next.locks.delete(name)
      } else {
        next.locks.add(name)
      }

      return next
    })
  }, [])

  const overrideSheet = useCallback((newSheet: ParsedStylesheet) => {
    setSheet(newSheet)
  }, [])

  const mergeSheet = useCallback((newSheet: ParsedStylesheet) => {
    setSheet((prevSheet) => {
      // * Account for locks, refs, etc.
      const lightPartial: Partial<ParsedStylesheet['light']> = {}
      const darkPartial: Partial<ParsedStylesheet['dark']> = {}

      if (prevSheet.locks?.size) {
        prevSheet.locks.forEach((lock) => {
          lightPartial[lock] = prevSheet.light[lock]
          darkPartial[lock] = prevSheet.dark[lock]
        })
      }

      const mergedSheet: ParsedStylesheet = {
        ...prevSheet,
        light: { ...prevSheet.light, ...newSheet.light, ...lightPartial },
        dark: { ...prevSheet.dark, ...newSheet.dark, ...darkPartial },
        locks: new Set([...prevSheet.locks, ...newSheet.locks]),
      }

      return mergedSheet
    })
  }, [])

  const applyFallbackStylesheet = useCallback(() => {
    const fallbackSheet = parseStylesheet(defaultCss)

    setSheet((currentStylesheet) => {
      // * Account for locks, refs, etc.
      const lightPartial: Partial<ParsedStylesheet['light']> = {}
      const darkPartial: Partial<ParsedStylesheet['dark']> = {}

      if (currentStylesheet.locks?.size) {
        currentStylesheet.locks.forEach((lock) => {
          lightPartial[lock] = currentStylesheet.light[lock]
          darkPartial[lock] = currentStylesheet.dark[lock]
        })
      }

      const mergedSheet: ParsedStylesheet = {
        ...currentStylesheet,
        light: {
          ...fallbackSheet.light,
          ...currentStylesheet.light,
          ...lightPartial,
        },
        dark: {
          ...fallbackSheet.dark,
          ...currentStylesheet.dark,
          ...darkPartial,
        },
        locks: new Set([...currentStylesheet.locks, ...fallbackSheet.locks]),
      }

      return mergedSheet
    })
  }, [])

  return {
    sheet,
    setColor,
    setRef,
    toggleValueLock,
    removeValue,
    overrideSheet,
    mergeSheet,
    applyFallbackStylesheet,
  }
}
