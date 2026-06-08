import { rest } from 'msw'
import { LibraryItemEndpointResponses } from '@tyto/lore'

export const LibraryItemEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/LibraryItem`, (req, res, ctx) => {
      const requiredProps = ['libraryID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(LibraryItemEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryItemEndpointResponses.get.success()),
      )
    }),
  ],
}
