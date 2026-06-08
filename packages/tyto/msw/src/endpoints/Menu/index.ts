import { rest } from 'msw'
import { MenuEndpointResponses } from '@tyto/lore'

export const MenuEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Menu`, (req, res, ctx) => {
      const requiredProps: string[] = []
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(MenuEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(ctx.status(200), ctx.json(MenuEndpointResponses.get.success()))
    }),
  ],
}
