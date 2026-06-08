import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { DISCProfileInteractiveMockup } from './DiscProfile.Interactive.Mockup'

const endpoint = TYTO_ENDPOINT_PATHS.DISCPROFILE_INTERACTIVE

export class DISCProfileInteractive extends Resource {
  Mockup?: DISCProfileInteractiveMockup

  protected override addResources(): void {
    this.Mockup = new DISCProfileInteractiveMockup(this.axiosInstance)
  }

  get(
    params: Endpoints.Tyto.DISCProfile.Interactive.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      discProfile: TytoData.DISCCompareProfile
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
