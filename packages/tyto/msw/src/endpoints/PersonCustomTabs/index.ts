import { rest } from 'msw'
import { PersonCustomTabsEndpointResponses } from '@tyto/lore'

export const PersonCustomTabsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Person/CustomTabs`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonCustomTabsEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonCustomTabsEndpointResponses.get.success())
      )
    }),
  ],
}
