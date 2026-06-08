import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, postCall, putCall } from '../utils/utils'

export class DevPlanStepVCEP extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DEVPLANSTEP_VCEP

  post(
    params: Endpoints.Tyto.DevPlanStepVCEP.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.DevPlanStepVCEP.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  put(
    params: Endpoints.Tyto.DevPlanStepVCEP.Put.Parameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.DevPlanStepVCEP.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
