import type { AxiosInstance } from 'axios'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DISCPROFILE_TEAM

export class DISCProfileTeam extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  get(
    params: Endpoints.Tyto.DISCProfile.Team.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
