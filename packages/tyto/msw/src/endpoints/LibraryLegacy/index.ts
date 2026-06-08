import { rest } from 'msw'
import { LibraryLegacyEndpointResponses } from '@tyto/lore'

export const LibraryLegacyEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Library/legacy`, (req, res, ctx) => {
      const requiredProps = ['memberID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              LibraryLegacyEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryLegacyEndpointResponses.success()),
      )
    }),
  ],
}
