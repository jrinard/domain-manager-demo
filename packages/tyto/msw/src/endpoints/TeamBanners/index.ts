import { rest } from 'msw'
import { TeamBannersEndpointResponses } from '@tyto/lore'

export const TeamBannersEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/team/banners`, (req, res, ctx) => {
      const requiredProps = ['teamID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TeamBannersEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamBannersEndpointResponses.get.success())
      )
    }),
  ],
}
