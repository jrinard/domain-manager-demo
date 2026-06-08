import { rest } from 'msw'
import { TasksEndpointResponses } from '@tyto/lore'

export const TasksEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.delete(`${baseUrl}/api/tasks`, (req, res, ctx) => {
      const requiredProps = ['taskID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TasksEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TasksEndpointResponses.delete.success())
      )
    }),
    rest.post(`${baseUrl}/api/tasks`, async (req, res, ctx) => {
      const requiredProps = [
        'dueDate',
        'startDate',
        'aboutID',
        'aboutType',
        'taskType',
        'displayInToDos',
        'sendNotice',
        'parentTaskID',
      ]
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TasksEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(201),
        ctx.json(TasksEndpointResponses.post.success())
      )
    }),
    rest.put(`${baseUrl}/api/tasks`, async (req, res, ctx) => {
      const requiredProps = ['taskID', 'displayInToDos']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(TasksEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(201),
        ctx.json(TasksEndpointResponses.put.success())
      )
    }),
  ],
}
