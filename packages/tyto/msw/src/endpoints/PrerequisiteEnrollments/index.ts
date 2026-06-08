import { rest } from 'msw'
import { PrerequisiteEnrollmentsEndpointResponses } from '@tyto/lore'

export const PrerequisiteEnrollmentsEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/PrerequisiteEnrollments`, (req, res, ctx) => {
      const searchParams = req.url.searchParams
      if (searchParams.get('blockID') === '2058598') {
        return res(
          ctx.status(200),
          ctx.json(
            PrerequisiteEnrollmentsEndpointResponses.get.success(
              '10XEmployeeWeek1',
            ),
          ),
        )
      } else if (searchParams.get('blockID') === '2058404') {
        return res(
          ctx.status(200),
          ctx.json(
            PrerequisiteEnrollmentsEndpointResponses.get.success(
              'EmployeePlatformReview',
            ),
          ),
        )
      }
      return res(
        ctx.status(200),
        ctx.json(PrerequisiteEnrollmentsEndpointResponses.get.success()),
      )
    }),
  ],
}

export const PrerequisiteEnrollmentsEndpoint3 = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/PrerequisiteEnrollments3`, (req, res, ctx) => {
      const searchParams = req.url.searchParams

      if (searchParams.get('blockID') === '2058598') {
        return res(
          ctx.status(200),
          ctx.json(
            PrerequisiteEnrollmentsEndpointResponses.get.success(
              '10XEmployeeWeek1',
            ),
          ),
        )
      } else if (searchParams.get('blockID') === '2058404') {
        return res(
          ctx.status(200),
          ctx.json(
            PrerequisiteEnrollmentsEndpointResponses.get.success(
              'EmployeePlatformReview',
            ),
          ),
        )
      }

      return res(
        ctx.status(200),
        ctx.json(PrerequisiteEnrollmentsEndpointResponses.get.success()),
      )
    }),
  ],
}
