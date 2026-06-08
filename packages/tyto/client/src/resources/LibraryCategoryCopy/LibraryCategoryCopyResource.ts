import { Resource } from '../../utils/helpers'
import { PostParameters, PostResponse } from './LibraryCategoryCopyTypes'

export class LibraryCategoryCopy extends Resource {
  override endpoint = '/LibraryCategory/copy'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
