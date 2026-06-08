import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAMTOOLSINVITE_EMAIL

export class TeamToolsInviteEmail extends Resource {
  post(
    params: Endpoints.Tyto.TeamToolsInvite.Email.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      recordsAffected: number
      emailQueueID: string
      emailKey: string
      tempSessionKey: string
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, callOpts)
  }
}
