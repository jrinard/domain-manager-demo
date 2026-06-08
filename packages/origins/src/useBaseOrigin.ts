import { usePropertyFromActiveSession } from '@spacedock/cargo-bay'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { getTopOrigin } from './parentOrigins'

/**
 * Returns the base origin for the assets and tyto endpoints
 * @returns `assetsBaseOrigin`, `tytoEndpointsBaseURL`
 * - assetsBaseOrigin is the base origin for the assets
 * - tytoEndpointsBaseURL is the base URL for the tyto endpoints
 * @note tytoEndpointsBaseURL includes the `/tyto/api` path
 */
export function useBaseOrigins() {
  const onCourseURL = usePropertyFromActiveSession('onCourseURL')
  let safeOrigin = onCourseURL ? onCourseURL : getTopOrigin(window)
  if (/(localhost)/gi.test(safeOrigin)) {
    safeOrigin = ''
  }

  const assetsBaseOrigin = safeOrigin || EnvironmentVariables.ASSETS_BASE_URL
  const tytoEndpointsBaseURL =
    (safeOrigin ? `${safeOrigin}/tyto/api` : undefined) ||
    EnvironmentVariables.TYTO_BASE_URL

  return {
    assetsBaseOrigin,
    tytoEndpointsBaseURL,
  }
}
