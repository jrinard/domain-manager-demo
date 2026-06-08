import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './ClientServiceNotesByElementTypes'

export class ClientServiceNotesByElement extends Resource {
  override endpoint = '/ClientServiceNotes/ByElement'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
