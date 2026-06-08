import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { ThinSkippyIdentityAuthorizationLogin } from './ThinSkippy.Identity.Authorization.Login'

const endpoint = TYTO_ENDPOINT_PATHS.THINSKIPPY_IDENTITY_AUTHORIZATION

export class ThinSkippyIdentityAuthorization extends Resource {
  Login?: ThinSkippyIdentityAuthorizationLogin

  protected override addResources(): void {
    this.Login = new ThinSkippyIdentityAuthorizationLogin(this.axiosInstance)
  }

  get(
    params: Endpoints.Tyto.ThinSkippy.Identity.Authorization.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
