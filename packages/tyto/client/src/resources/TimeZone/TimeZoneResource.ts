import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TimeZoneTypes'

export class TimeZone extends Resource {
  override endpoint = '/TimeZone'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
