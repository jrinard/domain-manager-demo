import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
} from './BlockEnrollmentCompletionPerSubBlockTypes'

export class BlockEnrollmentCompletionPerSubBlock extends Resource {
  override endpoint = '/BlockEnrollment/CompletionPerSubBlock'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
