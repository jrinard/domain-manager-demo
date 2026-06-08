import { getActiveSessionKey } from '../session-data'

export function useActiveSessionKey() {
  return getActiveSessionKey() || undefined
}
