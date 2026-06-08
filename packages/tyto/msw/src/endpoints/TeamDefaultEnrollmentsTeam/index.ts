import { rest } from 'msw'
import { TeamDefaultEnrollmentsTeamEndpointResponses } from '@tyto/lore'

export const TeamDefaultEnrollmentsTeamEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/teamDefaultEnrollments/Team`, (req, res, ctx) => {
      const requiredProps = ['teamID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamDefaultEnrollmentsTeamEndpointResponses.invalidMissingRequired(
                prop,
              ),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamDefaultEnrollmentsTeamEndpointResponses.get.success()),
      )
    }),
  ],
}
