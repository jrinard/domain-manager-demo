import { Resource } from '../../utils/helpers'
import {
  DeleteParameters,
  DeleteResponse,
  PostParameters,
  PostResponse,
  GetParameters,
  GetResponse,
} from './ClientServiceNoteTypes'

export class ClientServiceNote extends Resource {
  override endpoint = '/ClientServiceNote'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }
}
