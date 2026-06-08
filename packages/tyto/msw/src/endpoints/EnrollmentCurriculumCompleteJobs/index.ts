import { rest } from 'msw'
import { EnrollmentCurriculumCompleteJobsEndpointResponses } from '@tyto/lore'

export const EnrollmentCurriculumCompleteJobsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/enrollment/CurriculumCompleteJobs`,
      (req, res, ctx) => {
        const requiredProps = ['createdByID']
        for (const prop of requiredProps) {
          if (req.url.searchParams.toString().indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                EnrollmentCurriculumCompleteJobsEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(EnrollmentCurriculumCompleteJobsEndpointResponses.success()),
        )
      },
    ),
  ],
}
