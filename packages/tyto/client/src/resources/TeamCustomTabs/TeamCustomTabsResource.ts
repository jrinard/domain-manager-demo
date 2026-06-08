import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TeamCustomTabsTypes'

export class TeamCustomTabs extends Resource {
  override endpoint = '/Team/CustomTabs'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
