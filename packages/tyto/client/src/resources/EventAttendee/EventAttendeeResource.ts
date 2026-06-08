import { Resource } from '../../utils/helpers'
import {
  PutParameters,
  PutResponse,
  PostParameters,
  PostResponse,
  DeleteParameters,
  DeleteResponse,
} from './EventAttendeeTypes'

export class EventAttendee extends Resource {
  override endpoint = '/EventAttendee'

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
  post(data: PostParameters): Promise<PostResponse> {
    if (data.isCascade === undefined) {
      data.isCascade = false
    }
    return this.create<PostResponse>(data)
  }
}
