import { rest } from 'msw'
import { PersonAccountEndpointResponses } from '@tyto/lore'

export const PersonAccountEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/PersonAccount`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonAccountEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonAccountEndpointResponses.success()),
      )
    }),
    rest.put(`${baseUrl}/api/PersonAccount`, async (req, res, ctx) => {
      const requiredProps = ['personID', 'ownerUserID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonAccountEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonAccountEndpointResponses.put.success()),
      )
    }),
  ],
}
