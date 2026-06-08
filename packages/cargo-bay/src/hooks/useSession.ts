import { useState, useEffect } from 'react'
import type { Session } from '@spacedock/manifest'

import { getActiveSession } from '../session-data'
import { CUSTOM_EVENTS } from '../constants'

/**
 * Get the active session.
 * @returns `Session` object.
 * @throws If no active session is found.
 */
export function useSession_ORIGINAL() {
  const session = getActiveSession()

  if (!session) {
    throw new Error('No active session found')
  }

  return session
}

export function useSession<T extends boolean = true>(
  opts: { throwOnMissingSession?: T } = { throwOnMissingSession: true as T },
): T extends false ? Session | null | undefined : Session {
  // Initialize state with current localStorage value
  const [session, setSession] = useState(() => {
    return getActiveSession()
  })

  // Listen for the custom event from other components
  useEffect(() => {
    const handleSessionUpdate = () => {
      try {
        const storedSession = getActiveSession()
        setSession(storedSession)
      } catch (error) {
        console.error('Error while updating session:', error)
      }
    }

    window.addEventListener(CUSTOM_EVENTS.SESSION_UPDATED, handleSessionUpdate)
    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.SESSION_UPDATED,
        handleSessionUpdate,
      )
    }
  }, [])

  if (!session && opts?.throwOnMissingSession) {
    throw new Error('No active session found')
  }

  // * Use type assertion to match our conditional return type.
  // * This *ought to* work off the Functions Return Type, but TS still complains, so we'll just have to live with this...
  return session as T extends false ? Session | null | undefined : Session
}
