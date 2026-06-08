import { rest } from 'msw'
import { ViewHistoryMostRecentEndpointResponses } from '@tyto/lore'

export const ViewHistoryMostRecentEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/Lesson/ViewHistory/MostRecent`,
      (req, res, ctx) => {
        const requiredProps = ['personID']
        for (const prop of requiredProps) {
          if (req.url.searchParams.toString().indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                ViewHistoryMostRecentEndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(ViewHistoryMostRecentEndpointResponses.success()),
        )
      },
    ),
  ],
}
