import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, deleteCall, postCall, putCall } from '../utils/utils'

export class DevPlanStepRelation extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DEVPLANSTEPRELATION

  delete(
    params: Endpoints.Tyto.DevPlanStepRelation.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.DevPlanStepRelation.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  post(
    params: Endpoints.Tyto.DevPlanStepRelation.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.DevPlanStepRelation.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  put(
    params: Endpoints.Tyto.DevPlanStepRelation.Put.Parameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.DevPlanStepRelation.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
