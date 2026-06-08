import { ApplyAxios } from '../utils/helpers'

import { ExamTake } from './ExamTake'

export class Exam extends ApplyAxios {
  Take?: ExamTake

  protected override _applySubRoutes(): void {
    this.Take = new ExamTake(this.axiosInstance)
  }
}
