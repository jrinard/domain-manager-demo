import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.BLOCKENROLLMENT

export class BlockEnrollment extends Resource {
  post(
    params: Endpoints.Tyto.Block.Enrollment.Post.Parameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    return postCall<Endpoints.Tyto.Block.Enrollment.Post.Response>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts,
    )
  }
}
