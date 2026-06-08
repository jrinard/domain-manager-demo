import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './IdentityProvidersTypes'

export class IdentityProviders extends Resource {
  override endpoint = '/Identity/Providers'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
