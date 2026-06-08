import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DOMAIN_MESSAGE

export class DomainMessage extends ApplyAxios {
  put(
    params: Endpoints.Tyto.Domain.Message.PutParameters,
    callOpts?: CallOpts
  ) {
    return putCall<{
      message: TytoData.Domain.Message
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
