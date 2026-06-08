import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, postCall, CallOpts } from '../utils/utils'

import { Resource } from '../utils/helpers'

interface PostResponse {
  accountSession: {
    sessionKey: string
    timeoutMinutes: number
    userIDAdminBackdoor: number
    loginDomainID: string
    onCourseURL: string
  }
  newSession: {
    userID: number
    userName: string
    changePassword: boolean
    termsOfServiceSignatureRequired: boolean
    adminID: number
    teamListSyncDate: string
    koPermissionSyncDate: string
    domainID: number
    timeOutMnts: number
    onCourseURL: string
    profileThumbPath: string
    teamRootID: number
    roleID: number
    onlinePreference: string
  }
}

export class AccountSession extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.ACCOUNTSESSION
  get(
    params: Endpoints.Tyto.AccountSession.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.AccountSession.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      {
        circumventChangePasswordCheck: true,
        omitSessionKey: true,
        ...(callOpts || {}),
      }
    )
  }
  post(
    params: Endpoints.Tyto.AccountSession.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<PostResponse>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      {
        circumventChangePasswordCheck: true,
        ...(callOpts || {}),
      }
    )
  }
}
