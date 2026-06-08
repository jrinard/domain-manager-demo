import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAMTOOLS_EMAILLOGIN

export class TeamToolsEmailLogin extends Resource {
  post(
    params: Endpoints.Tyto.TeamTools.EmailLogin.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      recordsAffected: number
      emailQueueID: number
      emailKey: string
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, callOpts)
  }
}
