import { rest } from 'msw'
import { CurriculumSummaryReportEndpointResponses } from '@tyto/lore'

export const CurriculumSummaryReportEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/CurriculumSummaryReport`, (req, res, ctx) => {
      const requiredProps = ['curriculumIDs', 'teamPath']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              CurriculumSummaryReportEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(CurriculumSummaryReportEndpointResponses.get.success()),
      )
    }),
  ],
}
