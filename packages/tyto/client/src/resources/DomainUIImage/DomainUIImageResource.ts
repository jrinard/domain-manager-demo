import { Resource } from '../../utils/helpers'
import { DeleteParameters, DeleteResponse } from './DomainUIImageTypes'

export class DomainUIImage extends Resource {
  override endpoint = '/domain/ui/image'

  delete(params: DeleteParameters) {
    return this.remove<DeleteResponse>(params, true)
  }
}
