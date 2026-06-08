import { Resource } from '../../utils/helpers'
import { PostParameters, PostResponse } from './DomainInvitationEmailTypes'

export class DomainInvitationEmail extends Resource {
  override endpoint = '/DomainInvitationEmail'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
