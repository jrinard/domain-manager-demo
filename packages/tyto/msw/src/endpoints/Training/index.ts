import { rest } from 'msw'
import { TrainingEndpointResponses } from '@tyto/lore'

export const TrainingEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Training`, (req, res, ctx) => {
      const requiredProps = ['memberID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TrainingEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(ctx.status(200), ctx.json(TrainingEndpointResponses.success()))
    }),
  ],
}
