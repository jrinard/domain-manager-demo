import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.PEOPLE_ADVANCEDSEARCH

export class PersonAdvanced extends Resource {
  get(
    params: Endpoints.Tyto.PersonAdvanced.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.PersonAdvanced.Get.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }

  post(
    params: Endpoints.Tyto.PersonAdvanced.GetParameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.PersonAdvanced.Get.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }
}
