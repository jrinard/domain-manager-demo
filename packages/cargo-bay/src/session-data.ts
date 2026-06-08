import * as _ from 'lodash'

import type { Session } from '@spacedock/manifest'

import { LOC_STOR, SES_STOR } from './browser-storage'
import { BROWSER_STORAGE_KEY_RING } from './constants'
import {
  EmitSessionUpdated,
  EmitStoredSessionsChanged,
} from './custom-events/session'

const keys = BROWSER_STORAGE_KEY_RING

let ACTIVE_SESSION_KEY: string | undefined

const MEMOIZED_SESSIONS: {
  [sessionKey: string]: Session | null
} = {}

// * Pull what should be an Array of Session Data Objects from localStorage
/**
 * Pull what should be an Array of Session Data Objects from localStorage
 * @returns An `Array` of all currently existing `SessionData` objects
 */
export function getAllSessions(): Session[] {
  const storedSessionsRaw = LOC_STOR.get(keys.STORED_SESSIONS)

  if (!storedSessionsRaw) {
    return []
  }

  if (typeof storedSessionsRaw !== 'string') {
    if (Array.isArray(storedSessionsRaw)) {
      return storedSessionsRaw
    } else {
      // TODO
    }
  }

  try {
    const parsedData = JSON.parse(storedSessionsRaw)

    if (!Array.isArray(parsedData)) {
      return []
    }

    return parsedData
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error parsing sessions data from storage')
    return []
  }
}

/**
 * Retrieve and return the session with matching key from list stored in localStorage
 * @param {String} sessionKey - The target Session's `sessionKey` property (commonly the current `activeSessionKey` for the Site)
 * @returns The matching `SessionData` object, or `undefined` if no match is found.
 */
export function getSessionData(sessionKey: string) {
  if (!sessionKey) {
    return
  }

  const allSessions = getAllSessions()

  if (!allSessions || !allSessions.length) {
    return undefined
  }

  return allSessions.find(
    (sessionData) => sessionData.sessionKey === sessionKey,
  )
}

/**
 * Remove a specific Session Object from the list stored in localStorage
 * @param {String} sessionKey - The target Session's `sessionKey` property (commonly the current `activeSessionKey` for the Site)
 * @returns `Void`, or `undefined` if not `Sessions` exist.
 */
export function removeSessionData(sessionKey: string): void {
  if (!sessionKey) {
    return
  }

  if (MEMOIZED_SESSIONS[sessionKey]) {
    MEMOIZED_SESSIONS[sessionKey] = null
  }

  const allSessions = getAllSessions()

  if (!allSessions || !allSessions.length) {
    return
  }

  const newSessionsList = allSessions.filter(
    (sessionData) => sessionData.sessionKey !== sessionKey,
  )
  const asString = JSON.stringify(newSessionsList)

  try {
    LOC_STOR.set(keys.STORED_SESSIONS, asString)

    EmitStoredSessionsChanged()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error: ', err)
  }
}

/**
 * Store a Session Object in the list of Sessions in `localStorage`
 * @param {Object} session - The `SessionData` object to be stored
 * @returns A `Boolean` representing the success of the operation.
 */
export function storeSessionData(session: Session) {
  if (!session) {
    return false
  }

  const allCurrentSessions = getAllSessions()

  // TODO Handle storing a new session that is a duplicate (same userID)
  const matchesExistingStoredSession = (allCurrentSessions || []).some(
    (storedSession) => storedSession.sessionKey === session.sessionKey,
  )

  if (matchesExistingStoredSession) {
    return true
  }

  // * Redundant ensure same session isn't stored twice, and ensure multiples sessions for same userID are not stored
  const newSessionsListAsString = JSON.stringify(
    _.uniqBy(
      _.uniqBy([session, ...(allCurrentSessions || [])], 'sessionKey'),
      'userID',
    ),
  )

  try {
    LOC_STOR.set(keys.STORED_SESSIONS, newSessionsListAsString)

    EmitStoredSessionsChanged()

    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error: ', err)
    return false
  }
}

/**
 * Pull activeSessionKey from sessionStorage
 * @returns The `sessionKey` of the currently utilized `Session` (Stored in, and read from `sessionStorage`).
 */
export function getActiveSessionKey() {
  if (ACTIVE_SESSION_KEY) {
    return ACTIVE_SESSION_KEY
  }

  try {
    const activeSessKey = SES_STOR.get(keys.ACTIVE_SESSION_KEY)

    if (activeSessKey) {
      ACTIVE_SESSION_KEY = activeSessKey
    }

    return activeSessKey
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error: ', err)
    return undefined
  }
}

/**
 * Find and return session in `localStorage` matching a hypothetical `activeSessionKey` in `sessionStorage`.
 * @returns The matching `SessionData` object, or `undefined` if no match is found.
 */
export function getActiveSession(): Session | undefined | null {
  const activeSessionKey = getActiveSessionKey()

  if (!activeSessionKey) {
    return undefined
  }

  if (MEMOIZED_SESSIONS[activeSessionKey]) {
    return MEMOIZED_SESSIONS[activeSessionKey]
  }

  const allCurrentSessions = getAllSessions()

  const activeSessionData = (allCurrentSessions || []).find(
    (session) => session.sessionKey === activeSessionKey,
  )

  if (activeSessionData) {
    MEMOIZED_SESSIONS[activeSessionKey] = activeSessionData
  }

  return activeSessionData
}

/**
 * Safely Read a property from the currently active session, with typed return value based on supplied `propertyName`.
 * @param key - A specific `propertyName` within the `SessionData` object.
 * @returns The target `propertyValue`, or `undefined` if no match is found.
 */
export function getPropertyFromActiveSession<K extends keyof Session>(key: K) {
  const curActiveSession = getActiveSession()

  return curActiveSession?.[key]
}

export const ActiveSession = {
  userID: () => {
    return getPropertyFromActiveSession('userID')
  },
  roleID: () => {
    return getPropertyFromActiveSession('roleID')
  },
  domainID: () => {
    return getPropertyFromActiveSession('domainID')
  },
  teamRootID: () => {
    return getPropertyFromActiveSession('teamRootID')
  },
  sessionKey: () => {
    return getPropertyFromActiveSession('sessionKey')
  },
  profileThumbPath: () => {
    return getPropertyFromActiveSession('profileThumbPath')
  },
  teamListSyncDate: () => {
    return getPropertyFromActiveSession('teamListSyncDate')
  },
  adminID: () => {
    return getPropertyFromActiveSession('adminID')
  },
  isImpersonationSession: () => {
    return !!getPropertyFromActiveSession('adminID')
  },
  changePassword: () => {
    return getPropertyFromActiveSession('changePassword')
  },
  onCourseURL: () => {
    return getPropertyFromActiveSession('onCourseURL')
  },
  userName: () => {
    const userName = getPropertyFromActiveSession('userName')
    const [firstName = '', lastName = ''] = userName?.split(' ') ?? []

    return {
      firstName,
      lastName,
      fullName: userName ?? '',
    }
  },
  koPermissionSyncDate: () => {
    return getPropertyFromActiveSession('koPermissionSyncDate')
  },
  termsOfServiceSignatureRequired: () => {
    return getPropertyFromActiveSession('termsOfServiceSignatureRequired')
  },
  timeOutMnts: () => {
    return getPropertyFromActiveSession('timeOutMnts')
  },
  getSessionData: () => {
    return getActiveSession()
  },
}

// * Make sure a Session is still found in localStorage and if so, set the key in sessionStorage
// * Returns Boolean of whether it was successful or not
export function clearActiveSession() {
  const currentActiveSessionKey = getActiveSessionKey()

  if (!currentActiveSessionKey) {
    return false
  }

  if (MEMOIZED_SESSIONS[currentActiveSessionKey]) {
    MEMOIZED_SESSIONS[currentActiveSessionKey] = null
  }

  if (ACTIVE_SESSION_KEY) {
    ACTIVE_SESSION_KEY = undefined
  }

  const allStoredSessions = getAllSessions()

  if (!allStoredSessions || !allStoredSessions.length) {
    return true
  }

  const sessionsFiltered = (allStoredSessions || []).filter(
    (session) => session.sessionKey !== currentActiveSessionKey,
  )
  const storedSessionsAsString = JSON.stringify(sessionsFiltered)

  const updatedSuccessfully = LOC_STOR.set(
    keys.STORED_SESSIONS,
    storedSessionsAsString,
  )

  if (updatedSuccessfully) {
    EmitSessionUpdated()
    // * method returns 'true' always
    return removeActiveSessionKey()
  }

  return false
}

/**
 * Get a truncated version of the currently active sessionKey
 * @param length - The number of characters starting at the beginning of the sessionKey to return.
 * @returns The desired length of characters from the `sessionKey`, or `undefined`.
 */
export function getSafeToExposeSessionKey(length?: number) {
  // * Where 8 is the arbitrary default length in slices off the start
  const len = length ?? 8

  const sessionKey = getActiveSessionKey()

  return sessionKey ? `${sessionKey}`.slice(0, len) : undefined
}

/**
 * Make sure a Session is still found in localStorage and if so, set the key in sessionStorage
 * @returns `Boolean` representing whether it was successful or not
 */
export function removeActiveSessionKey() {
  SES_STOR.remove(keys.ACTIVE_SESSION_KEY)

  if (ACTIVE_SESSION_KEY) {
    ACTIVE_SESSION_KEY = undefined
  }

  return true
}

// * Returns Boolean of whether it was successful or not
/**
 * Make sure a Session is still found in `localStorage` and if so, set the `sessionKey` in `sessionStorage` as `activeSessionKey`.
 * @param sessionKey
 * @returns `Boolean` representing whether it was successful or not
 */
export function setActiveSession(sessionKey: string) {
  const allCurrentSessions = getAllSessions()

  const isFoundInList = (allCurrentSessions || []).some(
    (session) => session.sessionKey === sessionKey,
  )

  if (isFoundInList) {
    SES_STOR.set(keys.ACTIVE_SESSION_KEY, sessionKey)

    ACTIVE_SESSION_KEY = sessionKey

    // * Side Effect: Dispatch a custom event to notify other components that the session has been updated so Hooks rerun (`useSession`)
    EmitSessionUpdated()

    return true
  } else {
    return false
  }
}
