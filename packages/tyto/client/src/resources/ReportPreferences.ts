import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.REPORTPREFERENCES

export class ReportPreferences extends Resource {
  get(
    params: Endpoints.Tyto.ReportPreferences.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.ReportPreferences.Get.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
