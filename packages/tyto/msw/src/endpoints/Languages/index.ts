import { rest } from 'msw'
import { LanguagesEndpointResponses } from '@tyto/lore'

export const LanguagesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/localization/languages`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(LanguagesEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LanguagesEndpointResponses.success()),
      )
    }),
  ],
}
