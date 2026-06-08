import { rest } from 'msw'
import { TrainingDetailEndpointResponses } from '@tyto/lore'

export const TrainingDetailEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Training/Detail`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              TrainingDetailEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TrainingDetailEndpointResponses.get.success()),
      )
    }),
  ],
}
