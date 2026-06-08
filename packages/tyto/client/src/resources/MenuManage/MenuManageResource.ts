import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './MenuManageTypes'

export class MenuManage extends Resource {
  override endpoint = '/Menu/Manage'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
