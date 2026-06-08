import { Resource } from '../../utils/helpers'
import { TYTO_ENDPOINT_PATHS } from '../../constants'
import {
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './LaunchEnrollmentTypes'

export class LaunchEnrollment extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.LAUNCH_ENROLLMENT

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
