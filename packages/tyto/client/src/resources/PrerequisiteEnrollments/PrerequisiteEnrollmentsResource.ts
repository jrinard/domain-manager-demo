import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './PrerequisiteEnrollmentsTypes'

export class PrerequisiteEnrollments extends Resource {
  override endpoint = '/prerequisiteEnrollments3'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
