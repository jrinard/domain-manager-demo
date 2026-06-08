import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
  DeleteParameters,
  DeleteResponse,
} from './CustomTabTypes'

export class CustomTab extends Resource {
  override endpoint = '/CustomTab'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }
}
