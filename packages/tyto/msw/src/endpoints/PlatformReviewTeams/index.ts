import { rest } from 'msw'
import { PlatformReviewTeamsEndpointResponses } from '@tyto/lore'

export const PlatformReviewTeamsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/platformreview/teams`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(PlatformReviewTeamsEndpointResponses.get.success()),
      )
    }),
  ],
}
