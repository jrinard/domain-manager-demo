import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpointV2 = TYTO_ENDPOINT_PATHS.ENROLLMENT_SCORM_V1P2
const endpointV3 = TYTO_ENDPOINT_PATHS.ENROLLMENT_SCORM_V1P3

export class ScormV1P2 extends Resource {
  put(
    params: Endpoints.Tyto.Enrollment.Scorm.v1p2.PutParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return putCall(this.axiosInstance, endpointV2, params, callOpts)
  }
}

export class ScormV1P3 extends Resource {
  put(
    params: Endpoints.Tyto.Enrollment.Scorm.v1p3.PutParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return putCall(this.axiosInstance, endpointV3, params, callOpts)
  }
}
