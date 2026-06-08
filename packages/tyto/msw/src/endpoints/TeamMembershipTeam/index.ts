import { rest } from 'msw'
import { TeamMembershipTeamEndpointResponses } from '@tyto/lore'

export const TeamMembershipTeamEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.put(`${baseUrl}/api/TeamMembership/Team`, async (req, res, ctx) => {
      const requiredProps = ['parentTeamID', 'childTeamID', 'newTeamID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamMembershipTeamEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamMembershipTeamEndpointResponses.put.success()),
      )
    }),
  ],
}
