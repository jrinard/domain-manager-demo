import type { AxiosInstance } from 'axios'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.EXAM_TAKE_QUESTION

export class ExamTakeQuestion extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  get(
    params: Endpoints.Tyto.Exam.Take.Question.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Exam.Take.Question.Get.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
