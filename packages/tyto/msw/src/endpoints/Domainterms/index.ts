import { rest } from 'msw'
import { DomaintermsEndpointResponses } from '@tyto/lore'

export const DomaintermsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/domain/terms`, async (req, res, ctx) => {
      const requiredProps = ['domainID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(DomaintermsEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(DomaintermsEndpointResponses.success()),
      )
    }),
  ],
}
