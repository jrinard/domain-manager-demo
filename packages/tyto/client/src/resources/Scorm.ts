import { ApplyAxios } from '../utils/helpers'

import { ScormV1P2, ScormV1P3 } from './Enrollment.Scorm'

export class SCORM extends ApplyAxios {
  V1P2?: ScormV1P2
  V1P3?: ScormV1P3

  protected override _applySubRoutes(): void {
    this.V1P2 = new ScormV1P2(this.axiosInstance)
    this.V1P3 = new ScormV1P3(this.axiosInstance)
  }
}
