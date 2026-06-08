import { Resource } from '../../utils/helpers'
import { PutParameters, PutResponse } from './EventRsvpTypes'

export class EventRsvp extends Resource {
  override endpoint = '/EventRsvp'

  put(data: PutParameters) {
    return this.update<PutResponse>(data)
  }
}
