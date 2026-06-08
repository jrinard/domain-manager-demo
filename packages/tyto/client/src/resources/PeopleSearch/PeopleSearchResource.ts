import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PeopleSearchTypes'

export class PeopleSearch extends Resource {
  override endpoint = '/People/Search'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
