import { rest } from 'msw'
import { PersonLogonNameEndpointResponses } from '@tyto/lore'

export const PersonLogonNameEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/person/logonName`, async (req, res, ctx) => {
      const requiredProps = ['personID', 'logonName']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonLogonNameEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonLogonNameEndpointResponses.put.success()),
      )
    }),
  ],
}
