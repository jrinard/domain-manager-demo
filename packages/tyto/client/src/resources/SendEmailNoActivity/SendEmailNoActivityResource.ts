import { Resource } from '../../utils/helpers'
import { PostParameters, PostResponse } from './SendEmailNoActivityTypes'

export class SendEmailNoActivity extends Resource {
  override endpoint = '/sendEmail/noactivityAnnouncement'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
