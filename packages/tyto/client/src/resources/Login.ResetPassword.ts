import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { LoginResetPasswordValidate } from './Login.ResetPassword.Validate'

// * 1 week in minutes
const timeoutMinutes = 60 * 24 * 7

export class LoginResetPassword extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.LOGIN_RESETPASSWORD
  Validate!: LoginResetPasswordValidate

  protected override addResources(): void {
    this.Validate = new LoginResetPasswordValidate(this.axiosInstance)
  }

  post(
    params: Endpoints.Tyto.Login.ResetPassword.PostParameters,
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
