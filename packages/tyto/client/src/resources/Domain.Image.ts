import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DOMAIN_IMAGE

export class DomainImage extends Resource {
  put(params: Endpoints.Tyto.Domain.Image.PostParameters, callOpts?: CallOpts) {
    return putCall<{
      recordsAffected: number
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
