import type { Data } from '@spacedock/manifest'

export function objectIsSessionData(
  sessionData: unknown
): sessionData is Data.SessionData {
  if (typeof sessionData !== 'object' || !sessionData) {
    return false
  }

  const sessionDataAsObj = sessionData as Record<string, unknown>

  return (
    typeof sessionDataAsObj['sessionKey'] === 'string' &&
    typeof sessionDataAsObj['userID'] === 'number' &&
    typeof sessionDataAsObj['domainID'] === 'number' &&
    typeof sessionDataAsObj['teamRootID'] === 'number' &&
    typeof sessionDataAsObj['profileThumbPath'] === 'string' &&
    typeof sessionDataAsObj['teamListSyncDate'] === 'string' &&
    typeof sessionDataAsObj['adminID'] === 'number' &&
    typeof sessionDataAsObj['changePassword'] === 'boolean' &&
    typeof sessionDataAsObj['userName'] === 'string' &&
    typeof sessionDataAsObj['koPermissionSyncDate'] === 'string' &&
    typeof sessionDataAsObj['termsOfServiceSignatureRequired'] === 'boolean' &&
    typeof sessionDataAsObj['timeOutMnts'] === 'number'
  )
}
