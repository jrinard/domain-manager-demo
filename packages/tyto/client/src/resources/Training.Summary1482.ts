import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { CallOpts, getCall } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TRAINING_SUMMARY1482

export class TrainingSummary1482 extends Resource {
  get(
    params: Endpoints.Tyto.Training.Summary1482.GetParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Training.Summary1482.Get.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts
    )
  }
}
