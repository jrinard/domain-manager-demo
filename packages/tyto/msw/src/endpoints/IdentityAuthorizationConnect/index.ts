import { rest } from 'msw'
import { IdentityAuthorizationConnectEndpointResponses } from '@tyto/lore'

export const IdentityAuthorizationConnectEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(
      `${baseUrl}/api/Identity/Authorization/connect`,
      async (req, res, ctx) => {
        const requiredProps = ['identityProviderGUID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                IdentityAuthorizationConnectEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            IdentityAuthorizationConnectEndpointResponses.post.success(),
          ),
        )
      },
    ),
  ],
}
