import type { AxiosInstance } from 'axios'
import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.EMAILQUEUESTATUS_USER

export class EmailQueueStatusUser extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  post(
    params: Endpoints.Tyto.EmailQueueStatus.User.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      emailQueueStatus?: string
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, callOpts)
  }
}
