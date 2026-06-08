import { rest } from 'msw'
import { ViewHistorySummaryEndpointResponses } from '@tyto/lore'

export const ViewHistorySummaryEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Lesson/ViewHistory/Summary`, (req, res, ctx) => {
      const requiredProps = ['memberID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              ViewHistorySummaryEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(ViewHistorySummaryEndpointResponses.success()),
      )
    }),
  ],
}
