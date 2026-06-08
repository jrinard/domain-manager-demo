import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './BlocksForEnrollmentTypes'

export class BlocksForEnrollment extends Resource {
  override endpoint = '/blocks/forEnrollment'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
