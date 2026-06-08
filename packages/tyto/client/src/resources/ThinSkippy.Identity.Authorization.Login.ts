import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.THINSKIPPY_IDENTITY_AUTHORIZATION_LOGIN

export class ThinSkippyIdentityAuthorizationLogin extends Resource {
  post(
    params: Endpoints.Tyto.ThinSkippy.Identity.Authorization.Login.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Identity.Authorization.Login.Get.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
