import { rest } from 'msw'
import { EventRsvpEndpointResponses } from '@tyto/lore'

export const EventRsvpEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/EventRsvp`, async (req, res, ctx) => {
      const requiredProps = ['memberID', 'rsvpStatus', 'eventID']
      const data = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(data).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EventRsvpEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EventRsvpEndpointResponses.put.success())
      )
    }),
  ],
}
