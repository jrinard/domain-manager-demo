import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './EnrollmentHistoryTypes'

export class EnrollmentHistory extends Resource {
  override endpoint = '/enrollment/history'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
