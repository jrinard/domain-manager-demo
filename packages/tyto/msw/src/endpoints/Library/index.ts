import { rest } from 'msw'
import { LibraryEndpointResponses } from '@tyto/lore'

export const LibraryEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Library`, (req, res, ctx) => {
      const requiredProps = ['memberID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(LibraryEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryEndpointResponses.get.success()),
      )
    }),
    rest.post(`${baseUrl}/api/Library`, async (req, res, ctx) => {
      const requiredProps = ['memberID', 'courseItemID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(LibraryEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryEndpointResponses.post.success()),
      )
    }),
    rest.delete(`${baseUrl}/api/Library`, async (req, res, ctx) => {
      const requiredProps = ['libraryID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(LibraryEndpointResponses.invalidMissingRequired(prop)),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryEndpointResponses.delete.success()),
      )
    }),
  ],
}
