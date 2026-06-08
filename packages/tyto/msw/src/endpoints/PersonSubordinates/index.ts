import { rest } from 'msw'
import { PersonSubordinatesEndpointResponses } from '@tyto/lore'

export const PersonSubordinatesEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/Person/Subordinates`, (req, res, ctx) => {
      const requiredProps = ['managerPersonID']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PersonSubordinatesEndpointResponses.invalidMissingRequired(prop)
            )
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PersonSubordinatesEndpointResponses.get.success())
      )
    }),
  ],
}
