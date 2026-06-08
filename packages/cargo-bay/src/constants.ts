export const BROWSER_STORAGE_KEY_RING = {
  OUTSIDE_AUTH_GUID: 'outside-auth-guid',
  OUTSIDE_ACCOUNT_ID: 'outside-account-id',
  ACTIVE_SESSION_KEY: 'active-session-key',
  COURSE_PLAN_CONTEXT: 'course-plan-context',
  CATALOG_TOGGLED_PATHS: 'catalog-toggled-paths',
  INPUT_TEXT: 'input-text',
  LAST_SESSION_ACTIVITY: 'last-session-activity',
  LAST_LOGIN_SCREEN_EMAIL_ADDRESS_USED: 'last-login-screen-email-address-used',
  SESSION_DATA: 'session-data',
  SITE_HAS_PARENT: 'site-has-parent',
  SITE_THEME: 'site-theme',
  STORED_SESSIONS: 'stored-sessions',
  TEMP_SESSION_KEY: 'temp-session-key',
  SES_CHECK_REDIRECT_URL: 'session-check-redirect-url',
  API_HOSTNAME: 'api-hostname',
  HOME_LIST_VIEW: 'home-list-view',
  HOME_LIST_TOGGLED_OPEN_ITEMS: 'home-list-toggled-open-items',
  PARENT_CATALOG_CONTEXT: 'parent-catalog-context',
  PARENT_CURRICULUM_CONTEXT: 'parent-curriculum-context',
  SITE_MODE: 'site-mode',
  THIN_SKIPPY_DATA: 'thin-skippy-data',
} as const

const LOCAL_FORAGE_CONFIG_NAME = 'Tryyb-LF-Store'

export const LOCAL_FORAGE_CONFIG = {
  name: LOCAL_FORAGE_CONFIG_NAME,
  description:
    'Used for storing information for the various Mocaworks Web Applications',
}

export const CUSTOM_EVENTS: {
  STORAGE_VALUE_CHANGED: string
  CLEAR_SESSION: string
  SESSION_UPDATED: string
  STORED_SESSIONS_CHANGED: string
  INVALIDATE_USER_LANGUAGE_PREFERENCE_CACHE: string
} = {
  STORAGE_VALUE_CHANGED: 'storagevaluechanged',
  CLEAR_SESSION: 'clearsession',
  SESSION_UPDATED: 'sessionupdated',
  STORED_SESSIONS_CHANGED: 'storedsessionschanged',
  INVALIDATE_USER_LANGUAGE_PREFERENCE_CACHE:
    'invalidate-user-language-preference-cache',
}

export type InvalidateUserLanguagePreferenceCacheDetail = {
  /**
   * When provided, Tryyb google-translate seeds this value so "Translate site"
   * matches a just-saved preference before AccountSession.get reflects it.
   */
  languagePreference?: string | null
}

/** Clears (or seeds) google-translate language preference cache for the shell. */
export function dispatchInvalidateUserLanguagePreferenceCache(
  detail?: InvalidateUserLanguagePreferenceCacheDetail,
): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent<InvalidateUserLanguagePreferenceCacheDetail>(
      CUSTOM_EVENTS.INVALIDATE_USER_LANGUAGE_PREFERENCE_CACHE,
      { detail: detail ?? {} },
    ),
  )
}
