import { ApplyAxios } from '../utils/helpers'

import { LaunchEnrollment } from './LaunchEnrollment'

export class Launch extends ApplyAxios {
  Enrollment?: LaunchEnrollment

  protected override _applySubRoutes(): void {
    this.Enrollment = new LaunchEnrollment(this.axiosInstance)
  }
}
