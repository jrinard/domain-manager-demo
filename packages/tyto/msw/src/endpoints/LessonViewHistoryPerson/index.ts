import { rest } from 'msw'
import { LessonViewHistoryPersonEndpointResponses } from '@tyto/lore'

export const LessonViewHistoryPersonEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Lesson/ViewHistory/Person`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (!req.url.searchParams.has(prop)) {
          return res(
            ctx.status(400),
            ctx.json(
              LessonViewHistoryPersonEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(LessonViewHistoryPersonEndpointResponses.get.success()),
      )
    }),
  ],
}
