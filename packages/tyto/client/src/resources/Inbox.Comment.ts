import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { deleteCall, postCall, putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

import { InboxCommentLike, InboxCommentUnlike } from './Inbox.Comment.Like'

export class InboxComment extends Resource {
  Like?: InboxCommentLike
  Unlike?: InboxCommentUnlike

  static endpoint = TYTO_ENDPOINT_PATHS.INBOX_COMMENT

  protected override addResources(): void {
    this.Like = new InboxCommentLike(this.axiosInstance)
    this.Unlike = new InboxCommentUnlike(this.axiosInstance)
  }

  delete(
    params: Endpoints.Tyto.Inbox.Comment.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.Inbox.Comment.Delete.Response>(
      this.axiosInstance,
      InboxComment.endpoint,
      params || {},
      { paramsAsData: true, ...callOpts }
    )
  }
  put(
    params: Endpoints.Tyto.Inbox.Comment.Put.Parameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.Inbox.Comment.Put.Response>(
      this.axiosInstance,
      InboxComment.endpoint,
      params || {},
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.Inbox.Comment.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Inbox.Comment.Post.Response>(
      this.axiosInstance,
      InboxComment.endpoint,
      params || {},
      callOpts
    )
  }
}
