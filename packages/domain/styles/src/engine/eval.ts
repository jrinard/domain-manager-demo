import { TOKEN_DEFS, type TokenName } from '../schema/tokens'
import {
  DERIVATIONS,
  type OklchColor,
  type Mode,
  type Overrides,
  type Locks,
} from '../schema/derivations'

export interface EvaluateOptions {
  mode: Mode
  inputs?: Partial<Record<TokenName, OklchColor>>
  overrides?: Overrides
  locks?: Locks
}

export interface EvaluateResult {
  values: Record<TokenName, OklchColor>
}

export function evaluateTokens(options: EvaluateOptions): EvaluateResult {
  const {
    mode,
    inputs = {},
    overrides = {},
    locks = new Set<TokenName>(),
  } = options

  // 1) Initialize values with inputs (only for input tokens)
  const result: Partial<Record<TokenName, OklchColor>> = {}
  for (const name of Object.keys(TOKEN_DEFS) as TokenName[]) {
    const def = TOKEN_DEFS[name]
    if (def.kind === 'input') {
      const ovr = overrides[name]
      if (ovr) {
        result[name] = ovr
        continue
      }
      if (name in inputs) {
        result[name] = inputs[name] as OklchColor
      }
    }
  }

  // 2) Topologically sort derived tokens based on DERIVATIONS
  const order = topoOrder()

  // 3) Evaluate derived tokens
  for (const name of order) {
    const def = DERIVATIONS[name]
    if (!def) continue
    // Respect overrides or locks first
    const ovr = overrides[name]
    if (ovr) {
      result[name] = ovr
      continue
    }
    if (locks.has(name)) {
      // If locked but not overridden, leave as-is if already present, otherwise skip (caller may fill defaults later)
      if (result[name] !== undefined) continue
      // No value to keep; skip computation to preserve "unset but locked" state
      continue
    }

    // Gather refs
    const refs: Record<TokenName, OklchColor> = {} as any
    const deps = def.deps || []
    for (const d of deps) {
      const v = result[d]
      if (v === undefined) continue
      refs[d] = v
    }
    // Compute only if all deps are available
    if (deps.every((d) => result[d] !== undefined)) {
      result[name] = def.compute(refs, { mode })
    }
  }

  return { values: result as Record<TokenName, OklchColor> }
}

function topoOrder(): TokenName[] {
  // Kahn's algorithm over derived graph
  const inDegree = new Map<TokenName, number>()
  const adj = new Map<TokenName, TokenName[]>()
  const derivedNames = Object.keys(DERIVATIONS) as TokenName[]
  for (const name of derivedNames) {
    inDegree.set(name, 0)
    adj.set(name, [])
  }
  for (const [name, def] of Object.entries(DERIVATIONS) as [TokenName, any][]) {
    for (const dep of def.deps ?? []) {
      if (!inDegree.has(name)) inDegree.set(name, 0)
      inDegree.set(name, (inDegree.get(name) || 0) + 1)
      if (!adj.has(dep)) adj.set(dep, [])
      adj.get(dep)!.push(name)
    }
  }
  const queue: TokenName[] = []
  for (const [name, deg] of inDegree) if (deg === 0) queue.push(name)
  const order: TokenName[] = []
  while (queue.length) {
    const n = queue.shift()!
    order.push(n)
    for (const m of adj.get(n) || []) {
      inDegree.set(m, (inDegree.get(m) || 0) - 1)
      if ((inDegree.get(m) || 0) === 0) queue.push(m)
    }
  }
  return order
}
