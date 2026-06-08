import { rest } from 'msw'
import { CatalogPermissionEndpointResponses } from '@tyto/lore'

export const CatalogPermissionEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/CatalogPermission`, async (req, res, ctx) => {
      const requiredProps = ['catalogID', 'memberID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              CatalogPermissionEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CatalogPermissionEndpointResponses.put.success()),
      )
    }),
  ],
}
