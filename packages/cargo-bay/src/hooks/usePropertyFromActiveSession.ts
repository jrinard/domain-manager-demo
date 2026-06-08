import type { Session } from '@spacedock/manifest'

import { useSession } from './useSession'

export function usePropertyFromActiveSession<Key extends keyof Session>(
  property: Key,
): Session[Key] | undefined {
  const session = useSession({ throwOnMissingSession: false })

  return session?.[property]
}
