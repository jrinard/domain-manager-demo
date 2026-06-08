import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TASK_STRUCTURE

/**
 * @deprecated
 */
export class TaskStructure extends Resource {
  get(
    params: Endpoints.Tyto.Task.Structure.Get.Parameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Task.Structure.Get.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }
}
