import { Resource } from '../../utils/helpers'
import { GetRequest, GetResponse } from './PlatformReviewStatsTypes'

export class PlatformReviewStats extends Resource {
  override endpoint = '/platformreview/stats'

  get(props?: GetRequest): Promise<GetResponse> {
    return this.read<GetResponse>(props || {})
  }
}
