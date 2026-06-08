import { rest } from 'msw'
import { CoursesEndpointResponses } from '@tyto/lore'

export const CoursesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Blocks`, (req, res, ctx) => {
      const requiredProps = ['']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(CoursesEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(ctx.status(200), ctx.json(CoursesEndpointResponses.success()))
    }),
  ],
}
