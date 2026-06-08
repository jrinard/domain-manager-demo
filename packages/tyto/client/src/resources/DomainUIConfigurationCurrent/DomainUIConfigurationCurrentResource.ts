import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './DomainUIConfigurationCurrentTypes'

export class DomainUIConfigurationCurrent extends Resource {
  override endpoint = '/domain/ui/configuration/current'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
