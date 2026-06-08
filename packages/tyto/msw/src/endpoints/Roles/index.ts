import { rest } from 'msw'
import { RolesEndpointResponses } from '@tyto/lore'

export const RolesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Roles`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(RolesEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(RolesEndpointResponses.get.success())
      )
    }),
  ],
}
