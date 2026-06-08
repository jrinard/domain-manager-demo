import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PersonOutsideIdentityAllTypes'

export class PersonOutsideIdentityAll extends Resource {
  override endpoint = '/PersonOutsideIdentity/All'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
