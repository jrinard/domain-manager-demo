import { useCurrentUser } from '@spacedock/chaincode'

/** Syncs cargo-bay session into CurrentUserProvider context on mount. */
export function DemoUserBootstrap() {
  useCurrentUser()
  return null
}
