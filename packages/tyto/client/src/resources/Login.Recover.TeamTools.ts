import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

// * NOTE: 7 days in minutes; 1 week to use Link recovery email.
const timeoutMinutes = 60 * 24 * 7

export class LoginRecoverTeamTools extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.LOGIN_RECOVER_TEAMTOOLS

  post(
    params: Endpoints.Tyto.LoginRecover.PostParameters,
    callOpts?: CallOpts
  ): Promise<{ error?: any; session: Data.SessionData }> {
    return postCall<{
      error?: never
      session: Data.SessionData
    }>(
      this.axiosInstance,
      this.endpoint,
      { ...(params || {}), timeoutMinutes },
      { ...(callOpts || {}), omitSessionKey: true }
    )
  }
}
