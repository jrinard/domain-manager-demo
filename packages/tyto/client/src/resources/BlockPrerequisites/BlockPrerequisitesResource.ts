import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './BlockPrerequisitesTypes'

export class BlockPrerequisites extends Resource {
  override endpoint = '/block/prerequisites'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
