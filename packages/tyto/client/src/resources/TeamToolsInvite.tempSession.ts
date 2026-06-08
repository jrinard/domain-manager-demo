import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAMTOOLSINVITE_TEMPSESSION

export class TeamToolsInviteTempSession extends Resource {
  post(
    params: Endpoints.Tyto.TeamToolsInvite.TempSession.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      newSession: Data.SessionData
      accountSession: Data.SessionData
      emailKey: string
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, {
      circumventChangePasswordCheck: true,
      ...(callOpts || {}),
    })
  }
}
