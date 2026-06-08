import type { Data } from '@spacedock/manifest'
import { AxiosError } from 'axios'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { LoginRecoverTeamTools } from './Login.Recover.TeamTools'

// * 1 week in minutes; How long the person has to use the link in the email to reset their password.
const timeoutMinutes = 60 * 24 * 7

export class LoginRecover extends Resource {
  TeamTools!: LoginRecoverTeamTools
  override endpoint = TYTO_ENDPOINT_PATHS.LOGIN_RECOVER

  protected override addResources(): void {
    this.TeamTools = new LoginRecoverTeamTools(this.axiosInstance)
  }

  post(
    params: Endpoints.Tyto.LoginRecover.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<{ error?: Error | AxiosError; session: Data.SessionData }>(
      this.axiosInstance,
      this.endpoint,
      { ...(params || {}), timeoutMinutes },
      { ...(callOpts || {}), omitSessionKey: true }
    )
  }
}
