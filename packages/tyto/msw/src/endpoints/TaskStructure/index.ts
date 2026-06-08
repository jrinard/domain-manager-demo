import { rest } from 'msw'
import { TaskStructureEndpointResponses } from '@tyto/lore'

export const TaskStructureEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/task/structure`, (req, res, ctx) => {
      const requiredProps = ['taskID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TaskStructureEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      if (req.url.searchParams.get('taskID') === '2') {
        return res(
          ctx.status(200),
          ctx.json(TaskStructureEndpointResponses.get.success('no-tasks'))
        )
      }
      if (req.url.searchParams.get('taskID') === '3') {
        return res(ctx.delay('infinite'))
      }
      return res(
        ctx.status(200),
        ctx.json(TaskStructureEndpointResponses.get.success())
      )
    }),
  ],
}
