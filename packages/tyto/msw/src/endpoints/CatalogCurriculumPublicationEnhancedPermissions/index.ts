import { rest } from 'msw'

import { CatalogCurriculumPublicationEnhancedPermissionsEndpointResponses } from '@tyto/lore'

export const CatalogCurriculumPublicationEnhancedPermissionsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/CatalogCurriculumPublication/enhancedPermissions`,
      (req, res, ctx) => {
        const requiredProps = ['catalogID']
        for (const prop of requiredProps) {
          if (req.url.searchParams.toString().indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                CatalogCurriculumPublicationEnhancedPermissionsEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            CatalogCurriculumPublicationEnhancedPermissionsEndpointResponses.get.success(),
          ),
        )
      },
    ),
    rest.put(
      `${baseUrl}/api/CatalogCurriculumPublication/enhancedPermissions`,
      async (req, res, ctx) => {
        const requiredProps = ['catalogID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                CatalogCurriculumPublicationEnhancedPermissionsEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            CatalogCurriculumPublicationEnhancedPermissionsEndpointResponses.put.success(),
          ),
        )
      },
    ),
  ],
}
