import { getTopOrigin } from '@spacedock/origins'
import { makePathFullyQualified } from '@tyto/assets'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { ActiveSession } from '@spacedock/cargo-bay'

export function createFileURL(
  filePath: string,
  opts?: { includeSessionKey?: boolean },
) {
  const onCourseURL = ActiveSession.onCourseURL() || ''
  const topOrigin = getTopOrigin()

  let origin =
    !topOrigin || topOrigin === window.location.origin ? onCourseURL : topOrigin

  if (!origin || origin.includes('localhost')) {
    origin = EnvironmentVariables.ASSETS_BASE_URL
  }

  return makePathFullyQualified({
    baseURL: origin,
    relativePath: filePath,
    includeSessionKey: opts?.includeSessionKey,
  })
}
