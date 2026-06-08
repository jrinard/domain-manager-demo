/**
 * Cherry server origin regex pattern
 * Matches domains hosted on cherry backend
 */
export const CHERRY_INSTANCE_ORIGINS_REGEX =
  /^((((cherry(-|\w|\d)*|10xbuysell|10xhealthsystem|10Xhealthfs|10xcoaches|10xkids|ami|buildanempire|cardoneondemand|cv|cardoneu|cardoneuniversit|ctti|wave|cardoneuve|revified)\.mocaworks)|(cardoneventuresceo|cardoneworld|portal\.10xbuysell|10xbusinessadvisor|10Xkidsu|waveceo|grantondemand|cardoneu))\.com)/i

/**
 * Check if the current host is on a Cherry server
 * @param host - hostname to check (defaults to window.location.host)
 */
export function isCherry(host?: string) {
  const hostToCheck =
    host || (typeof window !== 'undefined' ? window.location.host : '')
  return CHERRY_INSTANCE_ORIGINS_REGEX.test(hostToCheck)
}

/**
 * Retrieve the ancestor origins array for a window.
 * @param window (optional)
 * @returns Parent Origins, where `_top` is last item
 */
export function getAncestorOriginsArray(_window?: Window) {
  const window = _window || globalThis.window

  if (!('ancestorOrigins' in window.location)) {
    return []
  }

  return Array.from(window.location.ancestorOrigins)
}

/**
 * Retrieve the parent origin for a window.
 * @param window (optional)
 * @returns Parent Origin
 * @example
 * ```
 * "https://grandparent.com" -> "https://parent.com" -> "https://child.com"
 * // * if called from "https://child.com":
 * getParentOrigin() // "https://parent.com"
 * ```
 */
export function getParentOrigin(window?: Window) {
  return getAncestorOriginsArray(window)[0]
}

/**
 * Retrieve the top-most origin for a window.
 * @param window (optional)
 * @returns Top-most Origin
 * @example
 * ```
 * "https://grandparent.com" -> "https://parent.com" -> "https://child.com"
 * // * if called from "https://child.com":
 * getTopOrigin() // "https://grandparent.com"
 * ```
 */
export function getTopOrigin(window?: Window) {
  return getAncestorOriginsArray(window).slice(-1)[0]
}
