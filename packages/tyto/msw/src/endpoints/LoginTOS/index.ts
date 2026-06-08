import { rest } from 'msw'
import { LoginTOSEndpointResponses } from '@tyto/lore'

export const LoginTOSEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Login/TOS`, (req, res, ctx) => {
      const requiredProps = ['domainID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(LoginTOSEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(ctx.status(200), ctx.json(LoginTOSEndpointResponses.success()))
    }),
  ],
}
