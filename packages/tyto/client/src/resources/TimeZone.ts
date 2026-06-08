import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TIMEZONE

export class TimeZone extends Resource {
  get(
    params: Endpoints.Tyto.TimeZone.Get.Parameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.TimeZone.Get.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }
}
