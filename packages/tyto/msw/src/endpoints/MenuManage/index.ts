import { rest } from 'msw'
import { MenuManageEndpointResponses } from '@tyto/lore'

export const MenuManageEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Menu/Manage`, (req, res, ctx) => {
      const requiredProps: string[] = []
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(MenuManageEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(MenuManageEndpointResponses.get.success()),
      )
    }),
  ],
}
