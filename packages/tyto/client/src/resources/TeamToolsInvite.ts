import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAMTOOLSINVITE

export class TeamToolsInvite extends Resource {
  post(
    params: Endpoints.Tyto.TeamToolsInvite.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      recordsAffected: number
      pwSessionKey: string
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, callOpts)
  }
}
