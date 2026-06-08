import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Resource } from '../utils/helpers'

export class TeamToolsConfig extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TEAMTOOLS_CONFIG

  get(params: Endpoints.Tyto.TeamTools.Config.GetParameters) {
    return this.read<Endpoints.Tyto.TeamTools.Config.GetResponse>(params)
  }

  delete(params: Endpoints.Tyto.TeamTools.Config.DeleteParameters) {
    return this.remove(params, true)
  }

  put(params: Endpoints.Tyto.TeamTools.Config.PutParameters) {
    return this.update(params)
  }
}
