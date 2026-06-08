import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './DomainUIConfigurationsTypes'

export class DomainUIConfigurations extends Resource {
  override endpoint = '/domain/ui/configurations'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
