import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  DeleteParameters,
  DeleteResponse,
} from './ClientServiceNoteAttachTypes'

export class ClientServiceNoteAttach extends Resource {
  override endpoint = '/ClientServiceNote/Attach'

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
