import { TYTO_ENDPOINT_PATHS } from '../constants'
import type { Endpoints } from '../typings'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class TeamsByFunction extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TEAMSBYFUNCTION

  get(
    params: Endpoints.Tyto.TeamsByFunction.Get.Parameters,
    callOpts?: CallOpts,
  ): Promise<Endpoints.Tyto.TeamsByFunction.Get.Response> {
    return getCall<Endpoints.Tyto.TeamsByFunction.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts,
    )
  }
}
