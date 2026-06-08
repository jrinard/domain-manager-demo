import { Resource } from '../../utils/helpers'
import { TYTO_ENDPOINT_PATHS } from '../../constants'
import { getCall } from '../../utils/utils'
import type { GetParameters, GetResponse } from './TaskProjectByTeamTypes'

export class TaskProjectByTeam extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TASK_PROJECT_BYTEAM

  get(params: GetParameters): Promise<GetResponse> {
    return getCall<GetResponse>(this.axiosInstance, this.endpoint, params)
  }
}
