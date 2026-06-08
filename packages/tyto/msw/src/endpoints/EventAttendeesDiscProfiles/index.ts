import { rest } from 'msw'
import { EventAttendeesDiscProfilesEndpointResponses } from '@tyto/lore'

export const EventAttendeesDiscProfilesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/EventAttendees/DiscProfiles`, (req, res, ctx) => {
      if (req.url.searchParams.toString().indexOf(':') >= 0) {
        return res(
          ctx.status(400),
          ctx.json(EventAttendeesDiscProfilesEndpointResponses.invalidFilter())
        )
      }
      const requiredProps = ['eventID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              EventAttendeesDiscProfilesEndpointResponses.invalidMissingRequired(
                prop
              )
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EventAttendeesDiscProfilesEndpointResponses.success())
      )
    }),
  ],
}
