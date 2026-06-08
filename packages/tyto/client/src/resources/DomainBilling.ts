import type { AxiosInstance } from 'axios'
import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DOMAINBILLING

export class DomainBilling extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  get(params: Endpoints.Tyto.DomainBilling.GetParameters, callOpts?: CallOpts) {
    return getCall<{
      billingSummary: TytoData.BillingSummary
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
