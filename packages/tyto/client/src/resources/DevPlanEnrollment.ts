import type { AxiosInstance } from 'axios'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DEVPLANENROLLMENT

export class DevPlanEnrollment extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

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
