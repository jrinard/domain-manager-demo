import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
} from './DomainInvitationEmailTemplateTypes'

export class DomainInvitationEmailTemplate extends Resource {
  override endpoint = '/DomainInvitationEmail/Template'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
