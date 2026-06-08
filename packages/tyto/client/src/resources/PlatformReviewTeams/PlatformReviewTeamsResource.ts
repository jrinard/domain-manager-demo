import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PlatformReviewTeamsTypes'

export class PlatformReviewTeams extends Resource {
  override endpoint = '/platformreview/teams'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
