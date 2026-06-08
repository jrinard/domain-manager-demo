import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PersonSubordinatesTypes'

export class PersonSubordinates extends Resource {
  override endpoint = '/Person/Subordinates'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
