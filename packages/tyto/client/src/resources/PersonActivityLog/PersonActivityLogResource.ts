import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PersonActivityLogTypes'

export class PersonActivityLog extends Resource {
  override endpoint = '/Person/ActivityLog'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
