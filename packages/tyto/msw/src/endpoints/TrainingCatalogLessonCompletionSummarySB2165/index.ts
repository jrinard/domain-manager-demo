import { rest } from 'msw'
import { TrainingCatalogLessonCompletionSummarySb2165EndpointResponses } from '@tyto/lore'

export const TrainingCatalogLessonCompletionSummarySB2165Endpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(
      `${baseUrl}/api/TrainingCatalogLessonCompletionSummary_SB2165`,
      (req, res, ctx) => {
        const requiredProps = ['teamID', 'catalogID']
        for (const prop of requiredProps) {
          if (!req.url.searchParams.has(prop)) {
            return res(
              ctx.status(400),
              ctx.json(
                TrainingCatalogLessonCompletionSummarySb2165EndpointResponses.invalidMissingRequired(
                  prop,
                ),
              ),
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(
            TrainingCatalogLessonCompletionSummarySb2165EndpointResponses.get.success(),
          ),
        )
      },
    ),
  ],
}
