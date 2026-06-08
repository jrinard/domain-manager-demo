import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

// * 1 week in minutes
const timeoutMinutes = 60 * 24 * 7

export class LoginResetPasswordValidate extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.LOGIN_RESETPASSWORD_VALIDATE

  get(
    params: Endpoints.Tyto.Login.ResetPassword.Validate.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      error?: never
      pwSession: Data.SessionData
      links: never[]
      logonName: string
      domain: never
    }>(
      this.axiosInstance,
      this.endpoint,
      { ...(params || {}), timeoutMinutes },
      { ...(callOpts || {}), omitSessionKey: true }
    )
  }
}
