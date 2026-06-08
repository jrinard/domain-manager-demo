import { rest } from 'msw'
import { EnrollmentHistoryEndpointResponses } from '@tyto/lore'

export const EnrollmentHistoryEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/enrollment/history`, (req, res, ctx) => {
      const requiredProps = ['memberID', 'curriculumID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              EnrollmentHistoryEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(EnrollmentHistoryEndpointResponses.success())
      )
    }),
  ],
}
