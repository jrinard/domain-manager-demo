import { rest } from 'msw'
import { EnrollmentCurriculumCompleteJobEndpointResponses } from '@tyto/lore'

export const EnrollmentCurriculumCompleteJobEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(
      `${baseUrl}/api/enrollment/CurriculumCompleteJob`,
      async (req, res, ctx) => {
        const requiredProps = ['memberIDs']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                EnrollmentCurriculumCompleteJobEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(EnrollmentCurriculumCompleteJobEndpointResponses.success()),
        )
      },
    ),
  ],
}
