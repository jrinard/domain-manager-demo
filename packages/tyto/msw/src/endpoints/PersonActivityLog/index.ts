import { rest } from 'msw'
import { PersonActivityLogEndpointResponses } from '@tyto/lore'

export const PersonActivityLogEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Person/ActivityLog`, (req, res, ctx) => {
      const requiredProps = ['personID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonActivityLogEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonActivityLogEndpointResponses.success())
      )
    }),
  ],
}
