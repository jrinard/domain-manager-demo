import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class DomainBillings extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DOMAINBILLINGS
  get(
    params: Endpoints.Tyto.DomainBillings.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      domainBilling: TytoData.DomainBilling[]
      session: Data.SessionData
    }>(this.axiosInstance, this.endpoint, params || {}, callOpts)
  }
}
