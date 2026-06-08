import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TASK_VERIFICATIONREQUEST

export class EnrollmentVerificationRequest extends Resource {
  put(
    params: Endpoints.Tyto.Enrollment.VerificationRequest.PutParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return putCall(this.axiosInstance, endpoint, params, callOpts)
  }
}
