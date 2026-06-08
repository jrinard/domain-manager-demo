import { rest } from 'msw'
import { CatalogCurriculumPublicationEndpointResponses } from '@tyto/lore'

export const CatalogCurriculumPublicationEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/CatalogCurriculumPublication`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              CatalogCurriculumPublicationEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CatalogCurriculumPublicationEndpointResponses.success()),
      )
    }),

  ],
}
