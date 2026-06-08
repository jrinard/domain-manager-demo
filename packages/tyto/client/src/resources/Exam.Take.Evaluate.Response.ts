import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.EXAM_TAKE_EVALUATE_RESPONSE

export class ExamTakeEvaluateResponse extends Resource {
  put(
    params: Endpoints.Tyto.Exam.Take.Evaluate.Response.PutParameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.Exam.Take.Evaluate.Response.Put.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
