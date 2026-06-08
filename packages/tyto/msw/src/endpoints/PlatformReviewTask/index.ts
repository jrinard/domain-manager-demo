import { rest } from 'msw'
import { PlatformReviewTaskEndpointResponses } from '@tyto/lore'

export const PlatformReviewTaskEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/platformreview/task`, (req, res, ctx) => {
      const requiredProps = ['taskID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PlatformReviewTaskEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PlatformReviewTaskEndpointResponses.get.success()),
      )
    }),
  ],
}
