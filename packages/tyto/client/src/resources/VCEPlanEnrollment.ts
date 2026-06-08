import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, postCall } from '../utils/utils'

export class VCEPlanEnrollment extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.VCEPLANENROLLMENT

  post(
    params: Endpoints.Tyto.VCEPlanEnrollment.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.VCEPlanEnrollment.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
