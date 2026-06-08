import { TeamsByFunctionEndpointResponses } from '@tyto/lore'
import { rest } from 'msw'

export const createTeamsByFunctionEndpoint = (baseUrl: string) => {
  return [
    rest.get(`${baseUrl}/api/TeamsByFunction`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(TeamsByFunctionEndpointResponses.success())
      )
    }),
  ]
}
