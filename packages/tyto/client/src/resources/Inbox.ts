import { Resource } from '../utils/helpers'

import { InboxComment } from './Inbox.Comment'
import { InboxMember } from './Inbox.Member'
import { CatalogInbox } from './Catalog.Inbox'
import { InboxConversations } from './Inbox.Conversations'
import { InboxConversation } from './Inbox.Conversation'

export class Inbox extends Resource {
  Comment!: InboxComment
  Member!: InboxMember
  Catalog!: CatalogInbox
  Conversations!: InboxConversations
  ConversationItem!: InboxConversation

  protected override addResources(): void {
    this.Comment = new InboxComment(this.axiosInstance)
    this.Member = new InboxMember(this.axiosInstance)
    this.Catalog = new CatalogInbox(this.axiosInstance)
    this.Conversations = new InboxConversations(this.axiosInstance)
    this.ConversationItem = new InboxConversation(this.axiosInstance)
  }
}
