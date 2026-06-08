import * as LocalForage from 'localforage'

export { LOC_STOR, SES_STOR } from './browser-storage'
export * as LF from './system-storage'
// * Below is an alias for LF, since SystemStorage feels more Understandable. (API Wrapper around LocalForage, which itself either uses indexedDB of WebSQL, depending on browser support)
export * as SystemStorage from './system-storage'
export * as SessionHandling from './session-data'
export { ActiveSession } from './session-data'
export {
  BROWSER_STORAGE_KEY_RING,
  CUSTOM_EVENTS,
  dispatchInvalidateUserLanguagePreferenceCache,
  type InvalidateUserLanguagePreferenceCacheDetail,
} from './constants'
export { objectIsSessionData } from './validation-utils'

export { LocalForage }
// * Hooks
export * from './hooks/useToggleSelectItems'
export * from './hooks/useActiveSessionKey'
export * from './hooks/usePropertyFromActiveSession'
export * from './hooks/useSession'
