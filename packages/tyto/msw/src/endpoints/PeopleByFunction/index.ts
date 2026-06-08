import { rest } from 'msw'
import { PeopleByFunctionEndpointResponses } from '@tyto/lore'

export const PeopleByFunctionEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/People/ByFunction`, (req, res, ctx) => {
      const requiredProps = ['teamID', 'functionName']
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(
              PeopleByFunctionEndpointResponses.invalidMissingRequired(prop),
            ),
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PeopleByFunctionEndpointResponses.success()),
      )
    }),
  ],
}
