import { rest } from 'msw'
import { TeamCustomTabsEndpointResponses } from '@tyto/lore'

export const TeamCustomTabsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Team/CustomTabs`, (req, res, ctx) => {
      const requiredProps = ['teamID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamCustomTabsEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamCustomTabsEndpointResponses.get.success())
      )
    }),
  ],
}
