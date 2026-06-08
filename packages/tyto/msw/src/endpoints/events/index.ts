import { rest } from 'msw'
import { EventsEndpointResponses } from '@tyto/lore'

export const EventsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/events`, (req, res, ctx) => {
      if (req.url.searchParams.toString().indexOf(':') >= 0) {
        return res(
          ctx.status(400),
          ctx.json(EventsEndpointResponses.invalidFilter())
        )
      }
      const requiredProps = ['direct', 'below', 'above']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EventsEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(ctx.status(200), ctx.json(EventsEndpointResponses.success()))
    }),
  ],
}
