import { rest } from 'msw'
import { TrainingSummaryEndpointResponses } from '@tyto/lore'

export const TrainingSummaryEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Training/Summary`, (req, res, ctx) => {
      const requiredProps = ['catalogID', 'afterDate', 'beforeDate', 'teamID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              TrainingSummaryEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TrainingSummaryEndpointResponses.get.success()),
      )
    }),
  ],
}
