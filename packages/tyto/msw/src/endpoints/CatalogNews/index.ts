import { rest } from 'msw'
import { CatalogNewsEndpointResponses } from '@tyto/lore'

export const CatalogNewsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/CatalogNews`, (req, res, ctx) => {
      const requiredProps = ['primaryElementIDs']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          console.error('req.url.searchParams', req.url.searchParams.toString())
          return res(
            ctx.status(400),
            ctx.json(CatalogNewsEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CatalogNewsEndpointResponses.get.success()),
      )
    }),
  ],
}
