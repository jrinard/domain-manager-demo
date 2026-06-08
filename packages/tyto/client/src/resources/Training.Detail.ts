import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TRAINING_DETAIL

export class TrainingDetail extends Resource {
  get(
    params: Endpoints.Tyto.Training.Detail.GetParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Training.Detail.Get.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }
}
