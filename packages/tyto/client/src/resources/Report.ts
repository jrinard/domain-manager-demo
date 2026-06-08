import { ApplyAxios } from '../utils/helpers'

import { ReportPreference } from './ReportPreference'
import { ReportPreferences } from './ReportPreferences'

export class Report extends ApplyAxios {
  Preference?: ReportPreference
  Preferences?: ReportPreferences

  protected override _applySubRoutes(): void {
    this.Preference = new ReportPreference(this.axiosInstance)
    this.Preferences = new ReportPreferences(this.axiosInstance)
  }
}
