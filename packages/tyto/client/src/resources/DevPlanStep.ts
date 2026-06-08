import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, deleteCall, postCall, putCall } from '../utils/utils'

export class DevPlanStep extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DEVPLANSTEP

  delete(
    params: Endpoints.Tyto.DevPlanStep.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.DevPlanStep.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  post(
    params: Endpoints.Tyto.DevPlanStep.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.DevPlanStep.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  put(params: Endpoints.Tyto.DevPlanStep.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.DevPlanStep.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
