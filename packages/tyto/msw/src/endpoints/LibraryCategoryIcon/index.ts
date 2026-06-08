import { rest } from 'msw'
import { LibraryCategoryIconEndpointResponses } from '@tyto/lore'

export const LibraryCategoryIconEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(
      `${baseUrl}/api/LibraryCategory/Icon`,
      async (req, res, ctx) => {
        const requiredProps = ['imageID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                LibraryCategoryIconEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(LibraryCategoryIconEndpointResponses.delete.success()),
        )
      },
    ),
    rest.post(`${baseUrl}/api/LibraryCategory/Icon`, async (req, res, ctx) => {
      const requiredProps = ['libraryCategoryID', 'memberID', 'fileUploadKey']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              LibraryCategoryIconEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryCategoryIconEndpointResponses.post.success()),
      )
    }),
  ],
}
