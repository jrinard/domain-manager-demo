import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  DeleteParameters,
  DeleteResponse,
} from './PersonCustomTabTypes'

export class PersonCustomTab extends Resource {
  override endpoint = '/Person/CustomTab'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }
}
