import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './EventAttendeesTypes'

export class EventAttendees extends Resource {
  override endpoint = '/EventAttendees'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
