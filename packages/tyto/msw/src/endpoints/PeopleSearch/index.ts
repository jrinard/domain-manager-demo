import { rest } from 'msw'
import { PeopleSearchEndpointResponses } from '@tyto/lore'

export const PeopleSearchEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/People/Search`, (req, res, ctx) => {
      const requiredProps = [
        'functionName',
        'operation',
        'securityHashfunctionName',
        'securityHashoperation',
      ]
      for (const prop of requiredProps) {
        if (req.url.searchParams.toString().indexOf(prop) < 0) {
          return res(
            ctx.status(400),
            ctx.json(PeopleSearchEndpointResponses.invalidMissingRequired(prop))
          )
        }
      }
      return res(
        ctx.status(200),
        ctx.json(PeopleSearchEndpointResponses.success())
      )
    }),
  ],
}
