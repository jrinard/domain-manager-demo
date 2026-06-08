import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
  PutParameters,
  PutResponse,
  DeleteParameters,
  DeleteResponse,
} from './TeamMembershipPersonTypes'

export class TeamMembershipPerson extends Resource {
  override endpoint = '/TeamMembership/Person'

  post(params: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(params)
  }

  put(params: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(params)
  }

  delete(params: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(params, true)
  }
}
