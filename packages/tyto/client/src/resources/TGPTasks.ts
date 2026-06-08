import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class TGPTasks extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TGPTASKS

  get(params: Endpoints.Tyto.TGPTasks.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.TGPTasks.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
