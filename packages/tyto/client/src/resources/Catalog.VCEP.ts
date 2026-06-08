import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

import {
  CallOpts,
  deleteCall,
  getCall,
  postCall,
  putCall,
} from '../utils/utils'

export class CatalogVCEP extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.CATALOGVCEP

  delete(
    params: Endpoints.Tyto.CatalogVCEP.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.CatalogVCEP.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  get(params: Endpoints.Tyto.CatalogVCEP.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.CatalogVCEP.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  post(
    params: Endpoints.Tyto.CatalogVCEP.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.CatalogVCEP.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  put(params: Endpoints.Tyto.CatalogVCEP.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.CatalogVCEP.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
