import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { deleteCall, getCall, postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { InboxMultipleReadStatus } from './ASP'

export class InboxConversations extends Resource {
  ToggleReadStatus!: InboxMultipleReadStatus
  override endpoint = TYTO_ENDPOINT_PATHS.INBOX

  protected override addResources(): void {
    this.ToggleReadStatus = new InboxMultipleReadStatus(this.axiosInstance)
  }

  delete(params: Endpoints.Tyto.Inbox.Delete.Parameters, callOpts?: CallOpts) {
    return deleteCall<Endpoints.Tyto.Inbox.Delete.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
  get(params: Endpoints.Tyto.Inbox.Get.Parameters, callOpts?: CallOpts) {
    return getCall<Endpoints.Tyto.Inbox.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
  post(params: Endpoints.Tyto.Inbox.Post.Parameters, callOpts?: CallOpts) {
    return postCall<Endpoints.Tyto.Inbox.Post.Response>(
      this.axiosInstance,
      this.endpoint,
      params || {},
      callOpts
    )
  }
}
