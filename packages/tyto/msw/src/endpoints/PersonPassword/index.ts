import { rest } from 'msw'
import { PersonPasswordEndpointResponses } from '@tyto/lore'

export const PersonPasswordEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/Person/Password`, async (req, res, ctx) => {
      const requiredProps = ['memberID', 'password']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonPasswordEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonPasswordEndpointResponses.put.success())
      )
    }),
  ],
}
