import { rest } from 'msw'
import { TranscriptEndpointResponses } from '@tyto/lore'

export const TranscriptEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/transcript`, (req, res, ctx) => {
      const requiredProps = ['forUserID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TranscriptEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TranscriptEndpointResponses.success())
      )
    }),
  ],
}
