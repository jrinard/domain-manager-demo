import { Resource } from '../utils/helpers'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { BlockEnrollment } from './BlockEnrollment'
import { SCORM } from './Scorm'
import { EnrollmentVerificationRequest } from './Enrollment.VerificationRequest'
import { DeleteParameters, DeleteResponse } from './Enrollment/EnrollmentTypes'
export class Enrollment extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.ENROLLMENT
  /**
   * @alias for `client.Block.Enrollment`
   */
  Course!: BlockEnrollment
  SCORM!: SCORM
  VerificationRequest!: EnrollmentVerificationRequest

  protected override addResources() {
    this.Course = new BlockEnrollment(this.axiosInstance)
    this.SCORM = new SCORM(this.axiosInstance)
    this.VerificationRequest = new EnrollmentVerificationRequest(
      this.axiosInstance
    )
  }

  delete(data: DeleteParameters): Promise<DeleteResponse> {
    return this.remove<DeleteResponse>(data, true)
  }
}
