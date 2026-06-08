import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.SESSION_LOGOUT

export class Logout extends Resource {
  post(
    params: Endpoints.Tyto.Session.Logout.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall(this.axiosInstance, endpoint, { ...params }, callOpts)
  }
}
