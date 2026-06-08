import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TeamIDsByFunctionTypes'
import { TYTO_ENDPOINT_PATHS } from '../../constants'

export class TeamIDsByFunction extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.TEAMIDSBYFUNCTION

  get(params?: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params || {})
  }
}
