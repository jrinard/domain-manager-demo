import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class TGPTask extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TGPTASK

  post(params: Endpoints.Tyto.TGPTask.Post.Parameters, callOpts?: CallOpts) {
    return postCall<Endpoints.Tyto.TGPTask.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }

  put(params: Endpoints.Tyto.TGPTask.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.TGPTask.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
