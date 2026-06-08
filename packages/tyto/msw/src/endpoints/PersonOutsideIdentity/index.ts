import { rest } from 'msw'
import { PersonOutsideIdentityEndpointResponses } from '@tyto/lore'

export const PersonOutsideIdentityEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/PersonOutsideIdentity`, (req, res, ctx) => {
      const requiredProps = ['identityProviderGUID', 'outsideID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonOutsideIdentityEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonOutsideIdentityEndpointResponses.get.success()),
      )
    }),
    rest.post(`${baseUrl}/api/PersonOutsideIdentity`, async (req, res, ctx) => {
      const requiredProps = ['stateCSRF']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonOutsideIdentityEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonOutsideIdentityEndpointResponses.post.success()),
      )
    }),
  ],
}
