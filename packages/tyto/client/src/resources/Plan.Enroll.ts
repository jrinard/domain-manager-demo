import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DEVPLAN_ENROLL

export class PlanEnroll extends Resource {
  post(
    params: Endpoints.Tyto.DevPlanEnrollment.PostRequest,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.DevPlan.Enrollment.Post.Response>(
      this.axiosInstance,
      endpoint,
      { ...params },
      callOpts
    )
  }
}
