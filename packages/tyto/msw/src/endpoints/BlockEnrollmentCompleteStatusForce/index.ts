import { rest } from 'msw'
import { BlockEnrollmentCompleteStatusForceEndpointResponses } from '@tyto/lore'

export const BlockEnrollmentCompleteStatusForceEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(
      `${baseUrl}/api/BlockEnrollment/CompleteStatusForce`,
      async (req, res, ctx) => {
        const requiredProps = ['blockID', 'enrollmentID', 'memberID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                BlockEnrollmentCompleteStatusForceEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            BlockEnrollmentCompleteStatusForceEndpointResponses.success(),
          ),
        )
      },
    ),
  ],
}
