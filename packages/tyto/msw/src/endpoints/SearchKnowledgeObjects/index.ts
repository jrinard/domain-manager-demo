import { rest } from 'msw'
import { SearchKnowledgeObjectsEndpointResponses } from '@tyto/lore'

export const SearchKnowledgeObjectsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/SearchKnowledgeObjects`, (req, res, ctx) => {
      const requiredProps = ['searchString']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              SearchKnowledgeObjectsEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(SearchKnowledgeObjectsEndpointResponses.success()),
      )
    }),
  ],
}
