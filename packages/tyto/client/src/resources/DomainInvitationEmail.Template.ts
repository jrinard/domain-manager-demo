import type { AxiosInstance } from 'axios'
import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DOMAININVITATIONEMAIL_TEMPLATE

export class DomainInvitationEmailTemplate extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  get(
    params: Endpoints.Tyto.DomainInvitationEmail.Template.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      template: any
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
