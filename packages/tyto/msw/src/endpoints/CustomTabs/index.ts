import { rest } from 'msw'
import { CustomTabsEndpointResponses } from '@tyto/lore'

export const CustomTabsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/CustomTabs`, (req, res, ctx) => {
      const requiredProps = ['domainID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(CustomTabsEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CustomTabsEndpointResponses.get.success())
      )
    }),
  ],
}
