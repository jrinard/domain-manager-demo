import { rest } from 'msw'
import { InboxConversationsEndpointResponses } from '@tyto/lore'

export const InboxConversationsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/inbox`, (req, res, ctx) => {
      if (req.url.search.includes('noticeID=-297')) {
        return res(
          ctx.status(401),
          ctx.json(InboxConversationsEndpointResponses.invalidUnauthenticated)
        )
      }
      return res(
        ctx.status(200),
        ctx.json(InboxConversationsEndpointResponses.get.success())
      )
    }),
  ],
}
