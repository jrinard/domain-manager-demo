import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, getCall } from '../utils/utils'

export class DevPlanSteps extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DEVPLANSTEPS

  get(params: Endpoints.Tyto.DevPlanSteps.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.DevPlanSteps.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
