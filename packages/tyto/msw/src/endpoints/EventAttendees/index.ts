import { rest } from 'msw'
import { EventAttendeesEndpointResponses } from '@tyto/lore'

export const EventAttendeesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/EventAttendees`, (req, res, ctx) => {
      if (req.url.searchParams.toString().indexOf(':') >= 0) {
        return res(
          ctx.status(400),
          ctx.json(EventAttendeesEndpointResponses.invalidFilter())
        )
      }
      const requiredProps = ['eventID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              EventAttendeesEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EventAttendeesEndpointResponses.success())
      )
    }),
  ],
}
