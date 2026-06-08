import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAM_PROFILEIMAGE

export class TeamProfileImage extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TEAM_PROFILEIMAGE

  post(
    params: Endpoints.Tyto.Team.ProfileImage.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      imageID: number
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params, callOpts)
  }
}
