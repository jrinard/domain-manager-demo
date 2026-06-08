import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PeopleByFunctionTypes'

export class PeopleByFunction extends Resource {
  override endpoint = '/People/ByFunction'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
