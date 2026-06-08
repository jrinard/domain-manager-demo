import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
  DeleteParameters,
  DeleteResponse,
} from './LibraryCategoryTypes'

export class LibraryCategory extends Resource {
  override endpoint = '/LibraryCategory'

  delete(params: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(params, true)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
