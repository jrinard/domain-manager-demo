import { rest } from 'msw'
import { TeamAdminEndpointResponses } from '@tyto/lore'

export const TeamAdminEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/team/admin`, (req, res, ctx) => {
      const requiredProps = ['teamID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TeamAdminEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamAdminEndpointResponses.success()),
      )
    }),
    rest.put(`${baseUrl}/api/team/admin`, async (req, res, ctx) => {
      const requiredProps = ['teamID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TeamAdminEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamAdminEndpointResponses.put.success()),
      )
    }),
  ],
}
