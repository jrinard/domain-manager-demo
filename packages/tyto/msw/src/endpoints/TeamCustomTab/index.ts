import { rest } from 'msw'
import { TeamCustomTabEndpointResponses } from '@tyto/lore'

export const TeamCustomTabEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/Team/CustomTab`, async (req, res, ctx) => {
      const requiredProps = ['traitID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamCustomTabEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamCustomTabEndpointResponses.post.success())
      )
    }),
    rest.delete(`${baseUrl}/api/Team/CustomTab`, async (req, res, ctx) => {
      const requiredProps = ['itemTraitID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamCustomTabEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamCustomTabEndpointResponses.delete.success())
      )
    }),
  ],
}
