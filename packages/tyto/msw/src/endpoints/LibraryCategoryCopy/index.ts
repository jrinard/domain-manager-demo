import { rest } from 'msw'
import { LibraryCategoryCopyEndpointResponses } from '@tyto/lore'

export const LibraryCategoryCopyEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/LibraryCategory/copy`, async (req, res, ctx) => {
      const requiredProps = [
        'sourceLibraryCategoryID',
        'sourceMemberID',
        'destParentLibraryCategoryID',
        'destMemberID',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              LibraryCategoryCopyEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LibraryCategoryCopyEndpointResponses.post.success()),
      )
    }),
  ],
}
