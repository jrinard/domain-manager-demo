import { rest } from 'msw'
import { BlocksForEnrollmentEndpointResponses } from '@tyto/lore'

export const BlocksForEnrollmentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/blocks/forEnrollment`, (req, res, ctx) => {
      const requiredProps = ['name']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              BlocksForEnrollmentEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(BlocksForEnrollmentEndpointResponses.get.success()),
      )
    }),
  ],
}
