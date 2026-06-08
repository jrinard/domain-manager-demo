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

export class DevPlanVCE extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DEVPLANVCE

  delete(
    params: Endpoints.Tyto.DevPlanVCE.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.DevPlanVCE.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      {
        paramsAsData: true,
        ...(callOpts ?? {}),
      }
    )
  }

  get(params: Endpoints.Tyto.DevPlanVCE.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.DevPlanVCE.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  post(params: Endpoints.Tyto.DevPlanVCE.Post.Parameters, callOpts?: CallOpts) {
    return postCall<Endpoints.Tyto.DevPlanVCE.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }

  put(params: Endpoints.Tyto.DevPlanVCE.Put.Parameters, callOpts?: CallOpts) {
    return putCall<Endpoints.Tyto.DevPlanVCE.Put.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
