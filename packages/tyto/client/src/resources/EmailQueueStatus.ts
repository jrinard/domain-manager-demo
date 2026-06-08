import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { EmailQueueStatusUser } from './EmailQueueStatus.User'

export class EmailQueueStatus extends Resource {
  User!: EmailQueueStatusUser
  override endpoint = TYTO_ENDPOINT_PATHS.EMAILQUEUESTATUS

  protected override addResources(): void {
    this.User = new EmailQueueStatusUser(this.axiosInstance)
  }

  post(
    params: Endpoints.Tyto.EmailQueueStatus.GetParameters,
    callOpts?: CallOpts
  ) {
    return getCall<{
      emailQueueStatus?: string
      session: Data.SessionData
    }>(this.axiosInstance, this.endpoint, params, callOpts)
  }
}
