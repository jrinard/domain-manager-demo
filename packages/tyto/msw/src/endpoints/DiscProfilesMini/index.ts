import { rest } from 'msw'
import { DiscProfilesMiniEndpointResponses } from '@tyto/lore'

export const DiscProfilesMiniEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/DiscProfiles/Mini`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(DiscProfilesMiniEndpointResponses.get.success()),
      )
    }),
  ],
}
