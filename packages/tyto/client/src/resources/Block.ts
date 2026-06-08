import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { BlockPrerequisites } from './Block.Prerequisites'
import { BlockEnrollment } from './BlockEnrollment'

export class Block extends Resource {
  Enrollment?: BlockEnrollment
  /**
   * @deprecated use 'Steps' instead
   */
  Prerequisites?: BlockPrerequisites
  /**
   * This is a conceptual name and does not exist in the Tyto HTTP Api.
   *    If an issue occurs please refer to this as `BlockPrerequisites` in Tyto HTTP API
   */
  Steps?: BlockPrerequisites

  protected applySubRoutes(): void {
    this.Enrollment = new BlockEnrollment(this.axiosInstance)
    this.Steps = new BlockPrerequisites(this.axiosInstance)
    this.Prerequisites = this.Steps
  }

  get(
    params: Endpoints.Tyto.Block.Get.Parameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Block.Get.Response>(
      this.axiosInstance,
      TYTO_ENDPOINT_PATHS.BLOCK,
      params,
      callOpts
    )
  }
}
