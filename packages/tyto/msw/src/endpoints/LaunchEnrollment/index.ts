import { rest } from 'msw'
import { LaunchEnrollmentEndpointResponses } from '@tyto/lore'

export const LaunchEnrollmentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/launch/enrollment`, async (req, res, ctx) => {
      const requiredProps = ['completeStatus', 'enrollmentID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              LaunchEnrollmentEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LaunchEnrollmentEndpointResponses.success())
      )
    }),
  ],
}
