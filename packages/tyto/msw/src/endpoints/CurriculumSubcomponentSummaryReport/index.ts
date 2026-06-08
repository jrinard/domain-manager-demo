import { rest } from 'msw'
import { CurriculumSubcomponentSummaryReportEndpointResponses } from '@tyto/lore'

export const CurriculumSubcomponentSummaryReportEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/CurriculumSubcomponentSummaryReport`,
      (req, res, ctx) => {
        const requiredProps = ['curriculumID']
        for (const prop of requiredProps) {
          if (!req.url.searchParams.has(prop)) {
            return res(
              ctx.status(400),
              ctx.json(
                CurriculumSubcomponentSummaryReportEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            CurriculumSubcomponentSummaryReportEndpointResponses.get.success(),
          ),
        )
      },
    ),
    rest.post(
      `${baseUrl}/api/CurriculumSubcomponentSummaryReport`,
      async (req, res, ctx) => {
        const requiredProps = ['curriculumID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                CurriculumSubcomponentSummaryReportEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            CurriculumSubcomponentSummaryReportEndpointResponses.post.success(),
          ),
        )
      },
    ),
  ],
}
