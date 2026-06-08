import { rest } from 'msw'
import { TeamMembershipPersonEndpointResponses } from '@tyto/lore'

export const TeamMembershipPersonEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.post(`${baseUrl}/api/TeamMembership/Person`, async (req, res, ctx) => {
      const requiredProps = ['teamID', 'memberID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamMembershipPersonEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamMembershipPersonEndpointResponses.post.success())
      )
    }),

    rest.put(`${baseUrl}/api/TeamMembership/Person`, async (req, res, ctx) => {
      const requiredProps = ['teamID', 'memberID']
      const body = await req.json()
      for (const prop of requiredProps) {
        if (Object.keys(body).indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              TeamMembershipPersonEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(TeamMembershipPersonEndpointResponses.put.success())
      )
    }),

    rest.delete(
      `${baseUrl}/api/TeamMembership/Person`,
      async (req, res, ctx) => {
        const requiredProps = ['memberID', 'teamID']
        const body = await req.json()
        for (const prop of requiredProps) {
          if (Object.keys(body).indexOf(prop) < 0) {
            return res(
              ctx.status(400),
              ctx.json(
                TeamMembershipPersonEndpointResponses.invalidMissingRequired(
                  prop
                )
              )
            )
          }
        }
        return res(
          ctx.status(200),
          ctx.json(TeamMembershipPersonEndpointResponses.delete.success())
        )
      }
    ),
  ],
}
