import { rest } from 'msw'
import { EventAgendaEndpointResponses } from '@tyto/lore'

export const EventAgendaEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/event/:eventID/agenda`, async (req, res, ctx) => {
      if (
        req.params?.eventID === undefined ||
        (req.params && req.params.eventID.length < 1)
      ) {
        return res(
          ctx.status(400),
          ctx.json(
            EventAgendaEndpointResponses.invalidMissingRequired('eventID')
          )
        )
      }
      return res(
        ctx.status(200),
        ctx.json(EventAgendaEndpointResponses.post.success())
      )
    }),
  ],
}
