import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const timeoutMinutes = 60 * 24 * 90

export class LoginAuthenticate extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.LOGIN_AUTHENTICATE

  post(
    params: Endpoints.Tyto.LoginAuthenticate.GetParameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      error?: never
      session: Data.SessionData
    }>(
      this.axiosInstance,
      this.endpoint,
      { ...(params || {}), timeoutMinutes },
      {
        circumventChangePasswordCheck: true,
        ...(callOpts || {}),
        omitSessionKey: true,
      }
    )
  }
}
