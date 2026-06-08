import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
  DeleteParameters,
  DeleteResponse,
} from './LibraryTypes'

export class Library extends Resource {
  override endpoint = '/Library'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  delete(params: DeleteParameters) {
    return this.remove<DeleteResponse>(params, true)
  }
}
