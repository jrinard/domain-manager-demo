import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import { CallOpts, postCall, putCall } from '../utils/utils'

export class VCEPItem extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.VCEPITEM

  post(params: Endpoints.Tyto.VCEPItem.Post.Parameters, callOpts?: CallOpts) {
    return postCall<Endpoints.Tyto.VCEPItem.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  put(params: Endpoints.Tyto.VCEPItem.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.VCEPItem.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
