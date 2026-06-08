import { rest } from 'msw'
import { PersonCustomTabEndpointResponses } from '@tyto/lore'

export const PersonCustomTabEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/Person/CustomTab`, async (req, res, ctx) => {
      const requiredProps = ['traitID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonCustomTabEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonCustomTabEndpointResponses.post.success())
      )
    }),
    rest.delete(`${baseUrl}/api/Person/CustomTab`, async (req, res, ctx) => {
      const requiredProps = ['itemTraitID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonCustomTabEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonCustomTabEndpointResponses.delete.success())
      )
    }),
  ],
}
