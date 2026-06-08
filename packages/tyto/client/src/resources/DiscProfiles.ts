import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { DISCProfileMini } from './DiscProfiles.Mini'
import { DISCProfilesEmailViewReady } from './DiscProfiles.EmailViewReady'

export class DISCProfiles extends Resource {
  EmailViewReady!: DISCProfilesEmailViewReady
  Mini!: DISCProfileMini

  override endpoint = TYTO_ENDPOINT_PATHS.DISCPROFILES

  protected override addResources(): void {
    this.EmailViewReady = new DISCProfilesEmailViewReady(this.axiosInstance)
    this.Mini = new DISCProfileMini(this.axiosInstance)
  }

  get(params: Endpoints.Tyto.DISCProfiles.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.DISCProfiles.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
