import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './EventAttendeesDiscProfilesTypes'

export class EventAttendeesDiscProfiles extends Resource {
  override endpoint = '/EventAttendees/DiscProfiles'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
