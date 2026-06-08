import { rest } from 'msw'
import { TimeZoneEndpointResponses } from '@tyto/lore'

export const TimeZoneEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/TimeZone`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TimeZoneEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(ctx.status(200), ctx.json(TimeZoneEndpointResponses.success()))
    }),
  ],
}
