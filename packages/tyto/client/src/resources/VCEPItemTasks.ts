import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, getCall } from '../utils/utils'

export class VCEPItemTasks extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.VCEPITEMTASKS

  get(
    params: Endpoints.Tyto.VCEPItemTasks.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.VCEPItemTasks.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
