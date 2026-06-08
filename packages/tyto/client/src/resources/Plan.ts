import { ApplyAxios } from '../utils/helpers'

import { PlanEnroll } from './Plan.Enroll'

export class Plan extends ApplyAxios {
  Enroll?: PlanEnroll

  protected override _applySubRoutes(): void {
    this.Enroll = new PlanEnroll(this.axiosInstance)
  }
}
