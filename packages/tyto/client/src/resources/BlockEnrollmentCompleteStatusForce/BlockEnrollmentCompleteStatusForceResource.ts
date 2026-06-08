import { Resource } from '../../utils/helpers'
import {
  PutParameters,
  PutResponse,
} from './BlockEnrollmentCompleteStatusForceTypes'

export class BlockEnrollmentCompleteStatusForce extends Resource {
  override endpoint = '/BlockEnrollment/CompleteStatusForce'

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
