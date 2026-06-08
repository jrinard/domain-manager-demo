import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.EXAM_TAKE_ANSWER

export class ExamTakeAnswer extends ApplyAxios {
  post(
    params: Endpoints.Tyto.Exam.Take.Answer.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Exam.Take.Answer.Post.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
