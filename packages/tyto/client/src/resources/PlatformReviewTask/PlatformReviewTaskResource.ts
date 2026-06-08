import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PlatformReviewTaskTypes'

export class PlatformReviewTask extends Resource {
  override endpoint = '/platformreview/task'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
