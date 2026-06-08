import { rest } from 'msw'
import { LibraryCategoryEndpointResponses } from '@tyto/lore'

export const LibraryCategoryEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/LibraryCategory`, async (req, res, ctx) => {
      const requiredProps = ['categoryName', 'memberID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              LibraryCategoryEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryCategoryEndpointResponses.post.success()),
      )
    }),

    rest.put(`${baseUrl}/api/LibraryCategory`, async (req, res, ctx) => {
      const requiredProps = ['libraryCategoryID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              LibraryCategoryEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryCategoryEndpointResponses.put.success()),
      )
    }),
  ],
}
