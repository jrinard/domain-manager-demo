import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class InboxCommentLike extends Resource {
  static endpoint = TYTO_ENDPOINT_PATHS.INBOX_COMMENT_LIKE
  put(
    params: Endpoints.Tyto.Inbox.Comment.Like.Put.Parameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.Inbox.Comment.Like.Put.Response>(
      this.axiosInstance,
      InboxCommentLike.endpoint,
      params || {},
      callOpts
    )
  }
}

export class InboxCommentUnlike extends Resource {
  static endpoint = TYTO_ENDPOINT_PATHS.INBOX_COMMENT_UNLIKE
  put(
    params: Endpoints.Tyto.Inbox.Comment.Unlike.Put.Parameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.Inbox.Comment.Unlike.Put.Response>(
      this.axiosInstance,
      InboxCommentUnlike.endpoint,
      params || {},
      callOpts
    )
  }
}
