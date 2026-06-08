import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  DeleteParameters,
  DeleteResponse,
} from './TeamCustomTabTypes'

export class TeamCustomTab extends Resource {
  override endpoint = '/Team/CustomTab'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }
}
