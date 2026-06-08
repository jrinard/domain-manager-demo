import { Resource } from '../../utils/helpers'
import { DeleteParameters, DeleteResponse } from './TeamDefaultEnrollmentTypes'

export class TeamDefaultEnrollment extends Resource {
  override endpoint = '/TeamDefaultEnrollment'

  delete(params: DeleteParameters) {
    return this.remove<DeleteResponse>(params, true)
  }
}
