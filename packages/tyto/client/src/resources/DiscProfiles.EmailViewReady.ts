import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.DISCPROFILES_EMAILVIEWREADY

export class DISCProfilesEmailViewReady extends Resource {
  post(
    params: Endpoints.Tyto.DISCProfiles.EmailViewReady.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<{
      emailResults: any[]
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, params || {}, callOpts)
  }
}
