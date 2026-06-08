import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './ViewHistorySummaryTypes'

export class ViewHistorySummary extends Resource {
  override endpoint = '/Lesson/ViewHistory/Summary'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
