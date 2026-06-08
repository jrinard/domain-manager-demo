import { rest } from 'msw'
import { PersonOutsideIdentityAllEndpointResponses } from '@tyto/lore'

export const PersonOutsideIdentityAllEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/PersonOutsideIdentity/All`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonOutsideIdentityAllEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonOutsideIdentityAllEndpointResponses.get.success()),
      )
    }),
  ],
}
