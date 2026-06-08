import { rest } from 'msw'
import { IdentityProvidersEndpointResponses } from '@tyto/lore'

export const IdentityProvidersEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Identity/Providers`, (req, res, ctx) => {
      const requiredProps = ['onCourseURL']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              IdentityProvidersEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(IdentityProvidersEndpointResponses.get.success()),
      )
    }),
  ],
}
