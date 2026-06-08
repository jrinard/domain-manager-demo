import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class InboxMember extends Resource {
  static endpoint = TYTO_ENDPOINT_PATHS.INBOX_MEMBER
  delete(
    params: Endpoints.Tyto.Inbox.Member.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return new Promise((res, rej) => {
      this.axiosInstance
        .delete<Endpoints.Tyto.Inbox.Member.Delete.Response>(
          InboxMember.endpoint,
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
  post(
    params: Endpoints.Tyto.Inbox.Member.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Inbox.Member.Post.Response>(
      this.axiosInstance,
      InboxMember.endpoint,
      params || {},
      callOpts
    )
  }
}
