import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './ViewHistoryMostRecentTypes'

export class ViewHistoryMostRecent extends Resource {
  override endpoint = '/Lesson/ViewHistory/MostRecent'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
