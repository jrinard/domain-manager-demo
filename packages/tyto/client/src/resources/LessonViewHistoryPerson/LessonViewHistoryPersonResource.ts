import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './LessonViewHistoryPersonTypes'

export class LessonViewHistoryPerson extends Resource {
  override endpoint = '/Lesson/ViewHistory/Person'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
