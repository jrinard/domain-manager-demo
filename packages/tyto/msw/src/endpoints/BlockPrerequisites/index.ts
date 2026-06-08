import { rest } from 'msw'
import { BlockPrerequisitesEndpointResponses } from '@tyto/lore'

export const BlockPrerequisitesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/block/prerequisites`, (req, res, ctx) => {
      const requiredProps = ['blockID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              BlockPrerequisitesEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(BlockPrerequisitesEndpointResponses.success()),
      )
    }),
  ],
}
