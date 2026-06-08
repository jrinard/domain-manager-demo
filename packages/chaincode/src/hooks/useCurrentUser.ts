import { SessionHandling } from '@spacedock/cargo-bay'
import type { Session } from '@spacedock/manifest'
import { useContext, useEffect, useMemo } from 'react'
import { CurrentUserContext } from '../CurrentUserProvider'

export const useCurrentUser = (): Session | undefined | null => {
  const context = useContext(CurrentUserContext)
  const cargoBayUser = SessionHandling.getActiveSession()
  useEffect(() => {
    if (!context || !cargoBayUser) return
    if (context.user?.userID === cargoBayUser.userID) return
    context.setUser(cargoBayUser)
  }, [cargoBayUser?.userID, context?.user?.userID])
  return useMemo(() => {
    return context?.user || cargoBayUser
  }, [cargoBayUser, context?.user?.userID])
}
