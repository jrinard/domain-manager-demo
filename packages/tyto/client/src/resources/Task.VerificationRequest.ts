import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TASK_VERIFICATIONREQUEST

export class TaskVerificationRequest extends Resource {
  put(
    params: Endpoints.Tyto.Task.VerificationRequest.Put.Parameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.Task.VerificationRequest.Put.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }
}
