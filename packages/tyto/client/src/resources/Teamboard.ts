import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAMBOARD

export class Teamboard extends Resource {
  get(
    params: Endpoints.Tyto.Teamboard.GetParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return getCall<{
      teamNotices: any[]
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, callOpts)
  }
}
