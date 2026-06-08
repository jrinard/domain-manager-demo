import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PeopleBrowseTypes'

export class PeopleBrowse extends Resource {
  override endpoint = '/people/browse'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
