import { rest } from 'msw'
import { PlatformReviewStatsEndpointResponses } from '@tyto/lore'

export const PlatformReviewStatsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/platformreview/stats`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(PlatformReviewStatsEndpointResponses.get.success()),
      )
    }),
  ],
}
