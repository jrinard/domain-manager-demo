import type { TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import {
  DEFAULT_APP_BRAND,
  DEFAULT_APP_VERSION,
  DEFAULT_COMPUTER_ID,
  DEFAULT_SESSION_TIMEOUT_LENGTH,
  TYTO_ENDPOINT_PATHS,
} from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class LoginAuthenticate4 extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.LOGIN_AUTHENTICATE4

  post(
    params: Endpoints.Tyto.LoginAuthenticate.GetParameters,
    callOpts?: CallOpts
  ): Promise<{ error?: never; authResults: TytoData.AuthResult[] }> {
    return postCall<{
      error?: never
      authResults: TytoData.AuthResult[]
    }>(
      this.axiosInstance,
      this.endpoint,
      {
        timeOutMinutes: DEFAULT_SESSION_TIMEOUT_LENGTH,
        computerID: DEFAULT_COMPUTER_ID,
        appBrand: DEFAULT_APP_BRAND,
        appVersion: DEFAULT_APP_VERSION,
        ...params,
      },
      {
        circumventChangePasswordCheck: true,
        ...(callOpts || {}),
        omitSessionKey: true,
      }
    )
  }
}
