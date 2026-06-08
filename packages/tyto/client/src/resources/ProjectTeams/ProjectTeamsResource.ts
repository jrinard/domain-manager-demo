import { Resource } from '../../utils/helpers'
import { TYTO_ENDPOINT_PATHS } from '../../constants'
import { getCall } from '../../utils/utils'
import type { GetParameters, GetResponse } from './ProjectTeamsTypes'

export class ProjectTeams extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.PROJECTTEAMS

  get(params: GetParameters): Promise<GetResponse> {
    return getCall<GetResponse>(this.axiosInstance, this.endpoint, params)
  }
}
