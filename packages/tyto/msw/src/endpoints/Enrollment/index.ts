import { rest } from 'msw'
import { EnrollmentEndpointResponses } from '@tyto/lore'

export const EnrollmentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(`${baseUrl}/api/Enrollment`, async (req, res, ctx) => {
      const requiredProps = ['blockID', 'memberID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(EnrollmentEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EnrollmentEndpointResponses.success())
      )
    }),
  ],
}
