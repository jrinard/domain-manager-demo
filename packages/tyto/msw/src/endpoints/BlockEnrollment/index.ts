import { rest } from 'msw'
import { BlockEnrollmentEndpointResponses } from '@tyto/lore'

export const BlockEnrollmentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/BlockEnrollment`, async (req, res, ctx) => {
      const requiredProps = ['blockID', 'memberID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              BlockEnrollmentEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(BlockEnrollmentEndpointResponses.success())
      )
    }),
  ],
}
