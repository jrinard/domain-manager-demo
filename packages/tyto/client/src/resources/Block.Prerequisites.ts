import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class BlockPrerequisites extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.BLOCK_PREREQUISITES

  get(
    params: Endpoints.Tyto.Block.Prerequisites.GetParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Block.Prerequisites.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params,
      callOpts
    )
  }
}
