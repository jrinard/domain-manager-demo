import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './CustomTabsTypes'

export class CustomTabs extends Resource {
  override endpoint = '/CustomTabs'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
