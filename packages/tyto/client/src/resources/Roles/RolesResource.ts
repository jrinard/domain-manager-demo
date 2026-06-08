import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './RolesTypes'

export class Roles extends Resource {
  override endpoint = '/Roles'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
