import { ApplyAxios } from '../utils/helpers'

import { ExamTakeEvaluateResponse } from './Exam.Take.Evaluate.Response'

export class ExamTakeEvaluate extends ApplyAxios {
  Response?: ExamTakeEvaluateResponse

  protected override _applySubRoutes(): void {
    this.Response = new ExamTakeEvaluateResponse(this.axiosInstance)
  }
}
