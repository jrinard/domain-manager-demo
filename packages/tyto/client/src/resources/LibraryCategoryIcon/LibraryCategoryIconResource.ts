import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  DeleteParameters,
  DeleteResponse,
} from './LibraryCategoryIconTypes'

export class LibraryCategoryIcon extends Resource {
  override endpoint = '/LibraryCategory/Icon'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  delete(params: DeleteParameters) {
    return this.remove<DeleteResponse>(params, true)
  }
}
