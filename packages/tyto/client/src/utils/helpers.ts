import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { TYTO_ENDPOINT_PATHS } from '../constants'
export { Resource } from './Resource'

// TODO https://cv-tech.atlassian.net/browse/TT-2721
// Emits an Authentication Failure Event (`JavaScript CustomEvent`)
// function emitAuthFailure() {
// ! TODO:
// ! This needs to be handled in some way at a global/application level.
// ! It is too tedious to manually setup up 100% of network requests to check
// ! if the request failed due to an auth failure.
// CustomEvents.ClearSession()
// }

// TODO https://cv-tech.atlassian.net/browse/TT-2721
// function updateSessionActivity() {
// SES_STOR.set(BROWSER_STORAGE_KEY_RING.LAST_SESSION_ACTIVITY, `${Date.now()}`)
// }

/**
 * TODO https://cv-tech.atlassian.net/browse/TT-2721
 * Would be called via an Axios Interceptor
 */
// function checkIfPasswordChangeIsTrueOnSession(
//     endpoint: string,
//     sessionData?: Data.SessionData
//   ) {
//     if (_.get(sessionData, 'changePassword', false)) {
//       console.log(
//         `Session found to need password change after getting response from ${endpoint}`
//       )
//       let currentPathName = window.location.pathname
//       if (/set-password/i.test(currentPathName)) {
//         currentPathName = '/'
//       }

//       window.location.href = `/set-password/my-password?redirect=${currentPathName}`
//     }
//   }

/**
 * Given an Axios Config, determines if the Session Key should be omitted from the Request
 * @param config - An `InternalAxiosRequestConfig`
 * @returns `Boolean` - whether it should be omitted or added (default)
 */
export function shouldOmitSessionKey(
  config: InternalAxiosRequestConfig & { omitSessionKey?: boolean }
): boolean {
  if (config.omitSessionKey) {
    return true
  }
  if (!config.url) {
    return false
  }

  switch (config.url) {
    case TYTO_ENDPOINT_PATHS.LOGIN_AUTHENTICATE:
    case TYTO_ENDPOINT_PATHS.LOGIN_AUTHENTICATE4:
      return true
    case TYTO_ENDPOINT_PATHS.ACCOUNTSESSION:
      return config.method?.toLocaleLowerCase?.() === 'post'
    default:
      return false
  }
}

/**
 * @deprecated Use Resource instead
 */
export class ApplyAxios {
  protected axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance

    this._applySubRoutes()
  }

  protected applySubRoutes() {
    // * Placeholder function
  }

  protected _applySubRoutes() {
    this.applySubRoutes()
  }
}
