import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TrainingSummaryTypes'

export class TrainingSummary extends Resource {
  override endpoint = '/Training/Summary'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
