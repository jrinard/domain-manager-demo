import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './CoursesTypes'

export class Courses extends Resource {
  override endpoint = '/Blocks'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
