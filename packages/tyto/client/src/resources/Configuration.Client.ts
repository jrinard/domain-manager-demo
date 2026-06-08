import type { TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class ConfigurationClient extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.CONFIGURATION_CLIENT

  get(
    params: Endpoints.Tyto.Configuration.Client.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<TytoData.Configuration.Client>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
