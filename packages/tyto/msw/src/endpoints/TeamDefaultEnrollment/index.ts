import { rest } from 'msw'
import { TeamDefaultEnrollmentEndpointResponses } from '@tyto/lore'

export const TeamDefaultEnrollmentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(
      `${baseUrl}/api/TeamDefaultEnrollment`,
      async (req, res, ctx) => {
        const requiredProps = ['teamDefaultEnrollmentID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                TeamDefaultEnrollmentEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(TeamDefaultEnrollmentEndpointResponses.delete.success()),
        )
      },
    ),
  ],
}
