import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
  DeleteParameters,
  DeleteResponse,
} from './EmailAddressTypes'

export class EmailAddress extends Resource {
  override endpoint = '/emailAddress'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }

  delete(params: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(params, true)
  }
}
