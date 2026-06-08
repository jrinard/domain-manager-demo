import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PersonCustomTabsTypes'

export class PersonCustomTabs extends Resource {
  override endpoint = '/Person/CustomTabs'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
