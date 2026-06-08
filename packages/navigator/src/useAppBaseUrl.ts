import { EnvironmentVariables } from '@spacedock/tricorder'
import { getTopOrigin } from '@spacedock/origins'

const LEGACY_HASH_BASE_PATH = '/v25/nl/#'

/**
 * Get the base path for the application.
 * Falls back to '/v25/nl/#' for legacy compatibility when no BASE_URL is configured.
 */
function getBasePath(): string {
  return EnvironmentVariables.BASE_URL || LEGACY_HASH_BASE_PATH
}

/**
 * Overtime, we'll add more complex logic to retrieve values from
 *    Tyto Menu or something else
 *
 * @param appName
 */
export const useAppBaseUrl = (
  appName: string | undefined,
): string | undefined => {
  if (appName === undefined) {
    return undefined
  }

  const basePath = getBasePath()
  const topOrigin = getTopOrigin()

  if (topOrigin) {
    return `${topOrigin}${basePath}/${appName}/`
  } else if (EnvironmentVariables.TRYYB_BASE_URL) {
    return `${EnvironmentVariables.TRYYB_BASE_URL}${basePath}/${appName}/`
  }

  return `${basePath}/${appName}/`
}
