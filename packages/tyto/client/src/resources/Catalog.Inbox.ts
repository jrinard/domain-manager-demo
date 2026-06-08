import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import {
  deleteCall,
  getCall,
  postCall,
  CallOpts,
  putCall,
} from '../utils/utils'
import { Resource } from '../utils/helpers'

export class CatalogInbox extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.CATALOGINBOX
  delete(
    params: Endpoints.Tyto.CatalogInbox.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.CatalogInbox.Delete.Response>(
      this.axiosInstance,
      `${this.endpoint}/Delete`,
      params || {},
      { ...callOpts, paramsAsData: true }
    )
  }
  get(params: Endpoints.Tyto.CatalogInbox.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.CatalogInbox.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.CatalogInbox.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.CatalogInbox.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
  put(params: Endpoints.Tyto.CatalogInbox.Get.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.CatalogInbox.Put.Response>(
      this.axiosInstance,
      `${this.endpoint}/Put`,
      params || {},
      callOpts
    )
  }
}
