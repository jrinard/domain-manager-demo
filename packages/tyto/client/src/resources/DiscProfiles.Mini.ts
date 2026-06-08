import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, postCall, putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DISCPROFILES_MINI

export class DISCProfileMini extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.DISCPROFILES_MINI
  get(
    params: Endpoints.Tyto.DISCProfilesMini.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.DISCProfilesMini.Get.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }

  post(
    params: Endpoints.Tyto.DISCProfilesMini.GetParameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      discProfiles: TytoData.DISCProfileMini[]
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }

  put(
    params: Endpoints.Tyto.DISCProfileMini.PutParameters,
    callOpts?: CallOpts
  ) {
    return putCall<{
      recordsAffected: number
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
