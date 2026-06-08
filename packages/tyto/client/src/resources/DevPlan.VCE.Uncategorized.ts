import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, getCall } from '../utils/utils'

export class DevPlanVCEUncategorized extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DEVPLANVCE_UNCATEGORIZED

  get(
    params: Endpoints.Tyto.DevPlanVCE.Uncategorized.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.DevPlanVCE.Uncategorized.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
