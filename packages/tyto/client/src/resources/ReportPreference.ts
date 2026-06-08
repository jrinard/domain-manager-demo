import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { deleteCall, postCall, putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.REPORTPREFERENCE

export class ReportPreference extends Resource {
  delete(
    params: Endpoints.Tyto.ReportPreference.DeleteParameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.ReportPreference.Delete.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.ReportPreference.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.ReportPreference.Post.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
  put(
    params: Endpoints.Tyto.ReportPreference.PutParameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.ReportPreference.Put.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
