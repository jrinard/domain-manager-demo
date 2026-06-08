import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class TGMTask extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TGMTASK

  post(params: Endpoints.Tyto.TGMTask.Post.Parameters, callOpts?: CallOpts) {
    return postCall<Endpoints.Tyto.TGMTask.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }

  put(params: Endpoints.Tyto.TGMTask.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.TGMTask.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
