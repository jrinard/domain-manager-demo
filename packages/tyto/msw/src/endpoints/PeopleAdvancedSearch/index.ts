import { rest } from 'msw'
import { PeopleAdvancedSearchEndpointResponses } from '@tyto/lore'

export const PeopleAdvancedSearchEndpoint = {
  createHandlers: (baseUrl: string) => [
    rest.get(`${baseUrl}/api/People/AdvancedSearch`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(PeopleAdvancedSearchEndpointResponses.success()),
      )
    }),
    rest.post(`${baseUrl}/api/People/AdvancedSearch`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(PeopleAdvancedSearchEndpointResponses.success()),
      )
    }),
  ],
}
