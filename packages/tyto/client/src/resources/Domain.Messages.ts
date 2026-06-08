import type { AxiosInstance } from 'axios'
import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DOMAIN_MESSAGES

export class DomainMessages extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  get(
    params: Endpoints.Tyto.Domain.Messages.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      domainMessages: TytoData.Domain.Message[]
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
