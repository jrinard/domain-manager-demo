import { Resource } from '../../utils/helpers'
import {
  PostParameters,
  PostResponse,
} from './PlatformReviewTeamInitializeTypes'

export class PlatformReviewTeamInitialize extends Resource {
  override endpoint = '/platformreview/team/initialize'

  post(data: PostParameters): Promise<PostResponse> {
    return this.create<PostResponse>(data)
  }
}
