import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './BlocksForEditTypes'

export class BlocksForEdit extends Resource {
  override endpoint = '/blocks/forEdit'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
