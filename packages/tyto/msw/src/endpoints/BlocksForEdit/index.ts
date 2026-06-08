import { rest } from 'msw'
import { BlocksForEditEndpointResponses } from '@tyto/lore'

export const BlocksForEditEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/blocks/forEdit`, (req, res, ctx) => {
      const requiredProps = ['name']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              BlocksForEditEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(BlocksForEditEndpointResponses.get.success()),
      )
    }),
  ],
}
