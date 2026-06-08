import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { ASPInboxStar, InboxReadStatus } from './ASP'

export class InboxConversation extends Resource {
  Star!: ASPInboxStar
  ReadStatus!: InboxReadStatus

  static endpoint = TYTO_ENDPOINT_PATHS.INBOX

  protected override addResources(): void {
    this.Star = new ASPInboxStar(this.axiosInstance)
    this.ReadStatus = new InboxReadStatus(this.axiosInstance)
  }

  delete(
    params: Endpoints.Tyto.Inbox.Delete.Parameters
  ): Promise<Endpoints.Tyto.Inbox.Delete.Response> {
    return new Promise((res, rej) => {
      this.axiosInstance
        .delete<Endpoints.Tyto.Inbox.Delete.Response>(
          InboxConversation.endpoint,
          {
            data: params,
          }
        )
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }
  post(params: Endpoints.Tyto.Inbox.Post.Parameters, callOpts?: CallOpts) {
    return postCall<Endpoints.Tyto.Inbox.Member.Post.Response>(
      this.axiosInstance,
      InboxConversation.endpoint,
      params || {},
      callOpts
    )
  }
}
