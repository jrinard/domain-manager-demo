import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './EmailQueueStatusUserTypes'

export class EmailQueueStatusUser extends Resource {
  override endpoint = '/EmailQueueStatus/User'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }
}
